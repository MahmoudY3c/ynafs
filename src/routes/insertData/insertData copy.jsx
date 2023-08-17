/* eslint-disable no-unused-vars */
import "../../css/style.css";
import React from "react";
import { Form, Alert } from "antd";
import LoadingModal from "../../components/LoadingModal";
import Nav from '../../components/Nav';
import useFetch from "../../hooks/useFetch";
import Choose from "../../components/Choose";
import { handleMultiple, handleTrueOrFalse } from "../../handlers/handlers";
import request from "../../API/api";
// import ChooseLesson from '../../components/ChooseLesson'
// import ChooseLevel from "../../components/ChooseLevel";
// import QuestionFeld from "../../components/QuestionFeld";
// import Multiple from "../../components/Multiple";
// import TrueOrFalse from "../../components/TrueOrFalse";
// import Question from "../../components/Question";
// import UploadBtn from "../../components/UploadBtn";
// import TextArea from "antd/es/input/TextArea";


function PageForm() {
  // form states
  const [form] = Form.useForm();
  const ref = React.createRef()
  // styles states
  const [openModal, setOpenModal] = React.useState(false);
  const [alert, setAlert] = React.useState({ display: "none" });
  // conponents states
  const [categoryValue, setCategoryValue] = React.useState(null);
  const [levelValue, setLevelValue] = React.useState(null);
  const [QuestionType, setQuestionType] = React.useState(null);
  const handleDisplayComponent = (value, setState) => value.length ? setState(value) : setState(null);
  const [trueOrFalse, setTrueOrFalse] = React.useState(null);
  const [multiple, setMultiple] = React.useState(null);
  // fetch states


  // function handleQuestionChange(value) {
  //   //remove any uploaded image on change
  //   form.setFieldsValue({ "image": undefined });
  //   setDisplayQestionFeld(true);
  //   // console.log(value, '*********************************');

  //   if (value.length) {
  //     if (value.includes("multiple")) {
  //       setMultiple(value);
  //       trueOrFalse && setTrueOrFalse(null);
  //     } else if (value.includes("true-or-false")) {
  //       setTrueOrFalse(value);
  //       multiple && setMultiple(null);
  //     }
  //   } else {
  //     // setQisplayQestionFeld(null);
  //     setMultiple(null);
  //     setTrueOrFalse(null);
  //   }
  //   console.log(`selected ${value}, ${value.length}`);
  // }

  // const [displayQestionFeld, setDisplayQestionFeld] = useState(true);
  // const handleUploadChange = () => setDisplayQestionFeld(false);



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
        <Choose
          name="category"
          url='/categories'
          items={{ item: "category", value: "_id" }}
          title='اختر القسم'
          onChange={(value) => handleDisplayComponent(value, setCategoryValue)}
        />
        {categoryValue &&
          <Choose
            name="level"
            items={{ item: "learningType", value: "_id" }}
            title='اختر المرحلة'
            url={`/lessons?category=${categoryValue}`}
            onChange={(value) => handleDisplayComponent(value, setLevelValue)}
          />
        }
        {levelValue &&
          <Choose
            name="level"
            items={{ item: "learningType", value: "_id" }}
            title='اختر المرحلة'
            url={`/lessons?category=${categoryValue}`}
            onChange={(value) => handleDisplayComponent(value, setLevelValue)}
          />
        }
      </Form>
    </>
  )
  // return (
  //   <div className="App">
  //     <header>
  //       <Nav />
  //     </header>
  //     <Alert
  //       message={alert?.message}
  //       type={alert?.type}
  //       style={{ ...styles.alert, display: alert?.display }}
  //       showIcon
  //       description=""
  //     />
  //     <LoadingModal state={openModal} />

  //     <Form
  //       onFinish={handleFinish}
  //       onSubmit={handleSubmit}
  //       ref={ref}
  //       form={form}
  //       style={{
  //         paddingBottom: "90px"
  //       }}
  //       rules={[
  //         { required: true, message: ' ' },
  //       ]}
  //     >
  //       <ChooseLesson data={data} loading={data.loading} onChange={handleLessonChange} />

  //       {levelValue && <ChooseLevel value={levelValue} onChange={handleLevelChange} data={data} />}
  //       {QuestionType &&
  //         <>
  //           <UploadBtn required name="powerpoint" title="قم برفع ملف ال powerpoint" path="/powerpoint" accept=".ppt,.pptx,.docx,.doc,.pdf" />
  //           <Question onChange={handleQuestionChange} />
  //         </>
  //       }
  //       {
  //         (multiple || trueOrFalse) &&
  //         <>
  //           <QuestionFeld form={form} display={displayQestionFeld} />
  //           <UploadBtn name="image" title="قم برفع صورة" onChange={handleUploadChange} />
  //         </>
  //       }
  //       {multiple && <Multiple />}
  //       {trueOrFalse && <TrueOrFalse />}
  //       <div className="sections-container">
  //         <Form.Item
  //           name="LessonVocabulary"
  //           hasFeedback
  //           rules={[{ required: true, message: '' }]}
  //           style={styles.textarea}
  //         >
  //           <TextArea placeholder="مفردات الدرس...." title="مفردات الدرس" style={styles.textarea} />
  //         </Form.Item>
  //         <Form.Item
  //           name="LessonPrepare"
  //           hasFeedback
  //           style={styles.textarea}
  //           rules={[{ required: true, message: '' }]}
  //         >
  //           <TextArea placeholder="اكتب تهيئة الدرس..." title="تهيئة الدرس" style={styles.textarea} />
  //         </Form.Item>
  //       </div>
  //       {/* <div className="sections-container">
  //         <TextArea name="TeacherInstructions" placeholder="قم بكتابة تعليمات المعلم...." title="تعليمات المعلم" />
  //         <TextArea name="LessonClose" placeholder="قم بكتابة إغلاق الدرس..." title="إغلاق الدرس" />
  //       </div> */}
  //       <section className="section-body">
  //         <button type="submit" className="submit-btn btn">حفظ</button>
  //       </section>
  //     </Form>
  //   </div>
  // );
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