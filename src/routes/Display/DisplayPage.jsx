/* eslint-disable no-unused-vars */
import "../../css/style.css";
import React, { useState } from "react";
import { Form, Alert, Input, Typography, Card, Space, Button } from "antd";
import LoadingModal from "../../components/LoadingModal";
import Nav from '../../components/Nav';
import useFetch from "../../hooks/useFetch";
import Choose from "../../components/Choose";
import { filterResponseData, handleMultiple, handleTrueOrFalse } from "../../handlers/handlers";
import request from "../../API/api";


function DisplayPage() {
  // form states
  const [form] = Form.useForm();
  const ref = React.createRef();
  const showError = err => {
    if (err) {
      setAlert({
        display: "flex",
        type: "error",
        message: err.message ? err.message : "حدث خطا اثناء حفظ السؤال برجاء المحاولة مره اخرى"
      });
    }

    hideModal(err)
  }
  const hideModal = err => {
    setTimeout(() => {
      setOpenModal(false)
      if (!err) setAlert({ display: "none" });
    }, 2000)
  }
  // styles states
  const [openModal, setOpenModal] = React.useState(false);
  const [alert, setAlert] = React.useState({ display: "none" });
  // conponents states
  const [coneponentsState, setConeponentsState] = React.useState({
    initial: true,
    categoryValue: null,
    levelValue: null,
    subjectValue: null,
    drivePowerPointValue: null,
  });

  const [questions, setQuestions] = React.useState(null);

  const handleDisplayComponent = (value, setState, prop, hide) => {
    if (value.length) {
      setState(prev => {
        const payload = {
          ...prev,
          [prop]: value
        }

        if (hide) {
          for (let g of hide) {
            payload[g] = null
            form.setFieldValue(g.replace('Value', ''), '');
          }
        }

        return { ...payload };
      })
    } else {
      setState(prev => ({ ...prev, [prop]: null }))
    }
  };
  // data states
  const { data: categories, loading: categoriesLoader } = useFetch('/categories');
  const [lessonsData, setLessonsData] = useState(null);

  // handle fetch lessons data
  React.useEffect(() => {
    if (coneponentsState.categoryValue) {
      request(`/lessons?category=${coneponentsState.categoryValue}`)
        .then(data => {
          const filteredData = filterResponseData(data);
          setLessonsData(filteredData);
          console.log(filteredData);
        })
    }
  }, [coneponentsState.categoryValue, setLessonsData])


  const handleSubmit = e => e.preventDefault();

  const handleFinish = (values) => {
    let arr = []
    // extract the subject id from the subject
    if (values.subject) {
      arr = values.subject.split('@@');
      values.subject = arr[arr.length - 1]
    }

    let path = '/categories';
    if (arr[0] && values.level) {
      path = '/subjects/data';
    }

    setOpenModal(true);

    request(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(values)
    })
      .then(json => {
        // form.setFieldValue('drivePowerPoint', '');
        if (json.err) {
          return showError(json.err);
        }


        let questionsData = [];
        for (let js of json) {
          if (js.Lessons) {
            let data = js.Lessons
              .map(e => e.LessonId.Trees
                .map(tree => tree.treeId.Questions
                  .map(q => q.QuestionId)
                )
              ).flat(2);
            questionsData = questionsData.concat(data);
          } else if (js.Trees) {
            let data = js.Trees
              .map(tree => tree.treeId.Questions
                .map(q => q.QuestionId)
              ).flat(1);
            questionsData = questionsData.concat(data);
          }
        }

        setQuestions(questionsData);

        // setQuestions(json)
        hideModal(json.err);
      }).catch(err => {
        showError(err);
        hideModal(err);
      })

  }

  console.log('====================================');
  console.log(questions, 'questions ...............');
  console.log('====================================');

  return (
    <>
      <header>
        <Nav />
      </header>
      <h1 className="container">Display Questions Page</h1>
      <Alert
        message={alert?.message}
        type={alert?.type}
        style={{ ...styles.alert, display: alert?.display }}
        showIcon
        description=""
      />
      <LoadingModal title="جاري البحث عن الاسئلة" state={openModal} />
      <Form
        onFinish={handleFinish}
        onSubmit={handleSubmit}
        ref={ref}
        form={form}
        style={{
          paddingBottom: "90px"
        }}
        rules={[
          { required: true, message: ' ' },
        ]}
      >
        <Choose
          data={categories}
          value={coneponentsState.categoryValue || ''}
          items={{ item: "category", value: "_id" }}
          title='اختر القسم'
          loading={categoriesLoader}
          required={[]}
          // mode='multiple'
          name="category"
          onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'categoryValue', [
            'levelValue',
            'subjectValue',
          ])}
        />

        {coneponentsState.categoryValue &&
          <Choose
            name="level"
            data={lessonsData}
            required={[]}
            // loading={loading}
            value={coneponentsState.levelValue || ''}
            title='اختر المرحلة'
            onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'levelValue', [
              'subjectValue',
            ])}
          />
        }
        {coneponentsState.levelValue &&
          <Choose
            name="subject"
            items={{ value: "subjectId" }}
            data={lessonsData[coneponentsState.levelValue]}
            value={coneponentsState.subjectValue || ''}
            title='اختر المادة الدراسية'
            onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'subjectValue')}
          />
        }
        <section className="section-body">
          <button type="submit" className="submit-btn btn">بحـث</button>
        </section>
      </Form>

      <Space direction="horizontal" wrap={true} align="center" style={{ justifyContent: 'center', padding: '20px', marginTop: '-95px' }}>
        {
          questions?.length && questions.map((q, index) => {
            const cardProps = q.question ? { title: q.question || '' } : q.image ? { cover: <img src={`/api/uploads/images/${q.image}?token=7YTf8jWTViAnTQCZkSr9SY0Cb0Vn8VyPF8NCE9wgnBQ=`} alt="" /> } : {};
            return (
              <Space direction="vertical" size={16} key={`${index}`}>
                <Card {...cardProps} style={{ direction: 'rtl', unicodeBidi: 'plaintext', width: '250px', height: '100%' }} bodyStyle={{ height: "100%" }}>
                  {
                    q.QuestionTypeValue === 'true-or-false'
                      ? q.choices.map((a, i) => (
                        <Button
                          key={`choice-${i}`}
                          icon={
                            a.isTrue
                              ? <i className="fas fa-check-circle" style={{ margin: 5, color: '#52c41a' }} />
                              : <i className="fas fa-times" style={{ margin: 5, color: 'red' }} />
                          }
                          style={{ whiteSpace: 'normal', wordBreak: 'break-word', display: 'flex', alignItems: 'center', margin: '10px 3px', border: 0 }}
                        >
                          {a.title}
                        </Button>
                      ))
                      : q.QuestionTypeValue === 'multiple'
                        ? q.choices.map((a, i) => (
                          <Button
                            key={`choice-${i}`}
                            icon={
                              a.isTrue
                                ? <i className="fas fa-check-circle" style={{ margin: 5, color: '#52c41a' }} />
                                : <i className="fas fa-times" style={{ margin: 5, color: 'red' }} />
                            }
                            style={{ whiteSpace: 'normal', wordBreak: 'break-word', display: 'flex', alignItems: 'center', margin: '10px 3px', border: 0 }}
                          >
                            {a.title}
                          </Button>
                        ))
                        : q.QuestionTypeValue === 'essay'
                        && (
                          <p style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{q.essayAnswer}</p>
                        )
                  }
                </Card>
              </Space >
            )
          })
        }
      </Space >
    </>
  );
}

const styles = {
  alert: {
    position: 'fixed',
    top: 0,
    width: '100%',
    direction: "rtl",
    fontFamily: "'Cairo'",
    padding: "20px",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000
  },
  textarea: {
    margin: "20px",
    width: '95%',
  }
};

export default DisplayPage;