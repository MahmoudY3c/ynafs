/* eslint-disable no-unused-vars */
import "../../css/style.css";
// import "./style.css";
import React, { useState } from "react";
import { Form, Alert, Input } from "antd";
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
  { type: 'صح او خطأ', value: "true-or-false" },
  { type: 'اختيار من متعدد', value: "multiple" },
  { type: 'سؤال مقالي', value: "essay" },
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
    lessonValue: null,
    treeValue: null,
    QuestionTypeValue: null,
    drivePowerPointValue: null,

    displayQestionFeld: true,
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
            form.setFieldValue(g.replace('Value', ''), '');
            if (g === 'QuestionTypeValue') form.setFieldValue(g, '');
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
  const [drivePowerPointDisabled, setDrivePowerPointDisabled] = useState(false);

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
    if (coneponentsState.lessonValue) {
      request(`/trees?lesson=${coneponentsState.lessonValue}`)
        .then(data => {
          setTreesData(data)
          setLoading(false)
        })
    }
  }, [coneponentsState.lessonValue, setLessonsData])

  const handleQuestionChange = value => {
    //remove any uploaded image on change
    form.setFieldsValue({ "image": undefined });
    setConeponentsState(prev => ({ ...prev, displayQestionFeld: true }));

    if (value.includes(questionTypes[0].value)) {
      setConeponentsState(prev => ({
        ...prev,
        trueOrFalse: true,
        multiple: false,
        essay: false,
      }));
    } else if (value.includes(questionTypes[1].value)) {
      setConeponentsState(prev => ({
        ...prev,
        trueOrFalse: false,
        multiple: true,
        essay: false,
      }));
    } else if (value.includes(questionTypes[2].value)) {
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
    let choices = [], answer = ''
    if (values.QuestionTypeValue === "true-or-false") {
      const trueOrFalse = handleTrueOrFalse(values);
      values = trueOrFalse.values;
      choices = choices.concat(trueOrFalse.choices);
    } else if (values.QuestionTypeValue === 'multiple') {
      let multpleChoices = Object.keys(values).filter(e => e.match(/multiple\d+/))
      multpleChoices.forEach((choice, i) => {
        const multiple = handleMultiple(choice, values, i);
        values = multiple.values;
        choices = choices.concat(multiple.choices);
        delete values[choice]
      })
    }

    values.choices = choices.length ? choices : null;
    if (values.image) values.image = values.image.filename
    // if (values.powerpoint) values.powerpoint = values.powerpoint.filename
    let arr = []
    // extract the subject id fron the subject
    if (values.subject) {
      arr = values.subject.split('@@');
      values.subject = arr[arr.length - 1]
    }
    setOpenModal(true);

    request('/questions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(values)
    })
      .then(json => {
        if (values.drivePowerPoint) {
          setLessonsData(e => {
            e[coneponentsState.levelValue][arr[0]].drivePowerPoint = values.drivePowerPoint;
            return { ...lessonsData }
          })
        }

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
        <Choose
          data={categories}
          value={coneponentsState.categoryValue || ''}
          items={{ item: "category", value: "_id" }}
          title='اختر القسم'
          loading={categoriesLoader}
          // mode='multiple'
          name="category"
          onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'categoryValue', [
            'treeValue',
            'levelValue',
            'subjectValue',
            'lessonValue',
            'lessonValue',
            'displayQestionFeld',
            'trueOrFalse',
            'multiple',
            'essay',
            'QuestionTypeValue',
            'drivePowerPointValue',
          ])}
        />

        {coneponentsState.categoryValue &&
          <Choose
            name="level"
            data={lessonsData}
            // loading={loading}
            value={coneponentsState.levelValue || ''}
            title='اختر المرحلة'
            onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'levelValue', [
              'subjectValue',
              // 'levelValue',
              'treeValue',
              'lessonValue',
              'displayQestionFeld',
              'trueOrFalse',
              'multiple',
              'essay',
              'QuestionTypeValue',
              'drivePowerPointValue',
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
            onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'subjectValue', [
              'lessonValue',
              'treeValue',
              'displayQestionFeld',
              'trueOrFalse',
              'multiple',
              'essay',
              'QuestionTypeValue',
              'drivePowerPointValue',
            ])}
          />
        }
        {coneponentsState.subjectValue &&
          <>
            {
              (
                !lessonsData[coneponentsState.levelValue]
                  ?.[coneponentsState.subjectValue.split('@@')[0]]
                  ?.drivePowerPoint
              ) &&
              <section className="section-body">
                <div className="container">
                  <div className="select-container">
                    <Form.Item
                      name="drivePowerPoint"
                      rules={[{ required: true, message: '' }]}
                    >
                      <Input
                        style={{ direction: 'ltr' }}
                        type="text"
                        className="text-field"
                        placeholder='قم بإضافة رابط جوجل درايف'
                      />
                    </Form.Item>
                  </div>
                </div>
              </section>
            }
            <Choose
              name="lesson"
              value={coneponentsState.lessonValue || ''}
              data={lessonsData[coneponentsState.levelValue][coneponentsState.subjectValue.split('@@')[0]]}
              items={{ item: ["unit", "chapter"], value: "_id" }}
              title='اختر الفصل / الوحدة'
              onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'lessonValue', [
                'treeValue',
                'displayQestionFeld',
                'trueOrFalse',
                'multiple',
                'essay',
                'QuestionTypeValue',
              ])}
            />
          </>
        }
        {coneponentsState.lessonValue &&
          <>
            <Choose
              name="tree"
              data={treesData}
              value={coneponentsState.treeValue || ''}
              items={{ item: 'title', value: "_id" }}
              title='اختر الدرس'
              onChange={(value) => handleDisplayComponent(value, setConeponentsState, 'treeValue', [
                'QuestionTypeValue',
                'displayQestionFeld',
                'trueOrFalse',
                'multiple',
                'essay',
              ])}
            />
          </>
        }
        {coneponentsState.treeValue &&
          <>
            <Choose
              name="QuestionTypeValue"
              items={{ item: "type", value: "value" }}
              data={questionTypes}
              title='اختر نوع السؤال'
              onChange={handleQuestionChange}
            />
          </>
        }
        {(coneponentsState.multiple || coneponentsState.trueOrFalse || coneponentsState.essay) &&
          <>
            <QuestionFeld form={form} display={coneponentsState.displayQestionFeld} />
            {coneponentsState.essay &&
              <QuestionFeld name="essayAnswer" title="اجابة السؤال" form={form} display={coneponentsState.displayQestionFeld} />
            }
            <UploadBtn
              name="image"
              path="/images"
              title="قم برفع صورة"
              onChange={handleUploadChange}
              form={form}
            />
          </>
        }
        {coneponentsState.multiple && <Multiple />}
        {coneponentsState.trueOrFalse && <TrueOrFalse />}

        {coneponentsState.lessonValue &&
          <div className="sections-container">
            <Form.Item
              name="LessonVocabulary"
              rules={[{ required: true, message: '' }]}
              style={styles.textarea}
            >
              <TextArea placeholder="مفردات الدرس...." title="مفردات الدرس" />
            </Form.Item>
            <Form.Item
              name="LessonPrepare"
              rules={[{ required: true, message: '' }]}
              style={styles.textarea}
            >
              <TextArea placeholder="اكتب تهيئة الدرس..." title="تهيئة الدرس" />
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
    width: '95%',
  }
};

export default PageForm;