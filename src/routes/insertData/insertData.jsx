/* eslint-disable no-unused-vars */
import "../../css/style.css";
import React, { useState } from "react";
import { Form, Alert } from "antd";
import LoadingModal from "../../components/LoadingModal";
import Nav from '../../components/Nav';
import useFetch from "../../hooks/useFetch";
import Choose from "../../components/Choose";
import { filterResponseData, handleMultiple, handleTrueOrFalse } from "../../handlers/handlers";
import request from "../../API/api";
// import ChooseLesson from '../../components/ChooseLesson'
// import ChooseLevel from "../../components/ChooseLevel";
import QuestionFeld from "../../components/QuestionFeld";
import Multiple from "../../components/Multiple";
import TrueOrFalse from "../../components/TrueOrFalse";
// import Question from "../../components/Question";
import UploadBtn from "../../components/UploadBtn";
import TextArea from "antd/es/input/TextArea";

const questionTypes = [
  { type: 'اختر نوع السؤال....' },
  { type: 'صح او خطأ' },
  { type: 'اختيار من متعدد' },
  { type: 'سؤال مقالي' },
]

function PageForm() {
  // form states
  const [form] = Form.useForm();
  const ref = React.createRef()
  // styles states
  const [openModal, setOpenModal] = React.useState(false);
  const [alert, setAlert] = React.useState({ display: "none" });
  // conponents states
  const [coneponentsState, setConeponentsState] = React.useState({
    initial: true,
    categoryValue: null,
    levelValue: null,
    subjectValue: null,
    unitValue: null,
    treeValue: null,

    displayQestionFeld: true,
    QuestionType: null,
    trueOrFalse: null,
    multiple: null,
    essay: null,
    areas: true
  });

  const handleDisplayComponent = (value, setState, prop, hide) => {

    console.log(value, 'levelValue    ');
    if (value.length) {
      setState(prev => {
        const payload = {
          ...prev,
          [prop]: value
        }

        if (hide) {
          for (let g of hide) {
            payload[g] = null
          }
        }

        return { ...payload };
      })
    } else {
      setState(prev => ({ ...prev, [prop]: null }))
    }
  };
  const handleUploadChange = () => setConeponentsState(prev => ({ ...prev, displayQestionFeld: false }))
  // data states
  const { data: categories, loading: categoriesLoader } = useFetch('/categories');
  const [lessonsData, setLessonsData] = useState(null);
  const [loading, setLoading] = React.useState(false)
  const [treesData, setTreesData] = useState(null);

  // handle fetch lessons data
  React.useEffect(() => {
    if (coneponentsState.categoryValue) {
      setLoading(true)
      request(`/lessons?category=${coneponentsState.categoryValue}`)
        .then(data => {
          const filteredData = filterResponseData(data);
          setLessonsData(filteredData);
          setLoading(false)
        })
    }
  }, [coneponentsState.categoryValue, setLessonsData])
  React.useEffect(() => {
    setLoading(true)
    if (coneponentsState.unitValue) {
      request(`/trees?lesson=${coneponentsState.unitValue}`)
        .then(data => {
          setTreesData(data)
          setLoading(false)
        })
    }
  }, [coneponentsState.unitValue, setLessonsData])

  const handleQuestionChange = value => {
    //remove any uploaded image on change
    form.setFieldsValue({ "image": undefined });
    setConeponentsState(prev => ({ ...prev, displayQestionFeld: true }));

    if (value.includes(questionTypes[1].type)) {
      setConeponentsState(prev => ({
        ...prev,
        trueOrFalse: true,
        multiple: false,
        essay: false,
      }));
    } else if (value.includes(questionTypes[2].type)) {
      setConeponentsState(prev => ({
        ...prev,
        trueOrFalse: false,
        multiple: true,
        essay: false,
      }));
    } else if (value.includes(questionTypes[3].type)) {
      setConeponentsState(prev => ({
        ...prev,
        trueOrFalse: false,
        multiple: false,
        essay: true,
      }));
    } else {
      setConeponentsState(prev => ({
        ...prev,
        trueOrFalse: false,
        multiple: false,
        essay: false,
      }));
    }
    console.log(`'%c selected ${value}`, `color: green;`, `Length: ${value.length}`);
  }

  const handleSubmit = e => {
    e.preventDefault();

    console.log('====================================');
    console.log(form);
    console.log('====================================');
  };

  const handleFinish = (values) => {
    //processing the data
    let choices = []
    if (values.questionType === "true-or-false") {
      const trueOrFalse = handleTrueOrFalse(values);
      values = trueOrFalse.values;
      choices = choices.concat(trueOrFalse.choices);
    } else if (values.questionType === 'multiple') {
      let multpleChoices = Object.keys(values).filter(e => e.match(/multiple\d+/))
      multpleChoices.forEach((choice, i) => {
        const multiple = handleMultiple(choice, values, i);
        values = multiple.values;
        choices = choices.concat(multiple.choices);
        delete values[choice]
      })
    }

    values.choices = choices;

    if (values.image) values.image = values.image.uid

    console.log('Received values of form: ', values, choices);
    setOpenModal(true);

    request('/add-question', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(values)
    })
      .then(json => {
        console.log(json)
        if (json.err) setAlert({
          display: "flex",
          type: "error",
          message: json.err.message ? json.err.message : "حدث خطا اثناء حفظ السؤال برجاء المحاولة مره اخرى"
        });

        else if (json.success) setAlert({ display: "flex", type: "success", message: "تم الحفظ بنجاح" })

        setTimeout(() => {
          setOpenModal(false)
          if (!json.err) setAlert({ display: "none" });
        }, 2000)
      })

  }

  return (
    <>
      <header> <Nav /></header>
      <Alert
        message={alert?.message}
        type={alert?.type}
        style={{ ...styles.alert, display: alert?.display }}
        showIcon
        description=""
      />
      <LoadingModal state={openModal} />

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
        {coneponentsState.initial &&
          <Choose
            data={categories}
            value={coneponentsState.categoryValue || ''}
            items={{ item: "category", value: "_id" }}
            title='اختر القسم'
            loading={categoriesLoader}
            // mode='multiple'
            name="category"
            onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'categoryValue', [
              'levelValue',
              'subjectValue',
              'unitValue',
              'displayQestionFeld',
              'trueOrFalse',
              'multiple',
              'essay',
              'QuestionType',
            ])}
          />
        }


        {coneponentsState.categoryValue &&
          <Choose
            name="level"
            data={lessonsData}
            loading={loading}
            value={coneponentsState.levelValue || ''}
            title='اختر المرحلة'
            onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'levelValue', [
              'subjectValue',
              // 'levelValue',
              'unitValue',
              'displayQestionFeld',
              'trueOrFalse',
              'multiple',
              'essay',
              'QuestionType',
            ])}
          />
        }
        {coneponentsState.levelValue &&
          <Choose
            name="subject"
            data={lessonsData[coneponentsState.levelValue]}
            value={coneponentsState.subjectValue || ''}
            title='اختر المادة الدراسية'
            onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'subjectValue', [
              // 'subjectValue',
              'displayQestionFeld',
              'trueOrFalse',
              'multiple',
              'essay',
              'QuestionType',
            ])}
          />
        }
        {coneponentsState.subjectValue &&
          <Choose
            name="unit"
            value={coneponentsState.unitValue || ''}
            data={lessonsData[coneponentsState.levelValue][coneponentsState.subjectValue]}
            items={{ item: ["unit", "chapter"], value: "_id" }}
            title='اختر الفصل / الوحدة'
            onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'unitValue')}
          />
        }
        {coneponentsState.unitValue &&
          <Choose
            name="tree"
            data={treesData}
            value={coneponentsState.treeValue || ''}
            items={{ item: 'title', value: "_id" }}
            title='اختر الدرس'
            onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'treeValue')}
          />
        }
        {coneponentsState.treeValue &&
          <>
            <UploadBtn
              required
              name="powerpoint"
              title="قم برفع ملف ال powerpoint"
              path="/powerpoint"
              accept=".ppt,.pptx,.docx,.doc,.pdf"
            />
            <Choose
              name="questionType"
              items={{ item: "type", value: "type" }}
              data={questionTypes}
              title='اختر نوع السؤال'
              onChange={handleQuestionChange}
            />
          </>
        }
        {(coneponentsState.multiple || coneponentsState.trueOrFalse || coneponentsState.essay) &&
          <>
            <QuestionFeld form={form} display={coneponentsState.displayQestionFeld} />
            <UploadBtn name="image" title="قم برفع صورة" onChange={handleUploadChange} />
          </>
        }
        {coneponentsState.multiple && <Multiple />}
        {coneponentsState.trueOrFalse && <TrueOrFalse />}

        {coneponentsState.unitValue &&
          <div className="sections-container">
            <Form.Item
              name="LessonVocabulary"
              hasFeedback
              rules={[{ required: true, message: '' }]}
              style={styles.textarea}
            >
              <TextArea placeholder="مفردات الدرس...." title="مفردات الدرس" style={styles.textarea} />
            </Form.Item>
            <Form.Item
              name="LessonPrepare"
              hasFeedback
              style={styles.textarea}
              rules={[{ required: true, message: '' }]}
            >
              <TextArea placeholder="اكتب تهيئة الدرس..." title="تهيئة الدرس" style={styles.textarea} />
            </Form.Item>
          </div>
        }
        <section className="section-body">
          <button type="submit" className="submit-btn btn">حفظ</button>
        </section>
      </Form>
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
    width: '80%',
  }
};

export default PageForm;