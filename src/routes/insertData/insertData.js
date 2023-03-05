import "../../css/style.css";
import ChooseLesson from '../../components/ChooseLesson.js'
import Nav from '../../components/Nav.js'
import TextArea from '../../components/TextArea.js'
import { Form, Alert } from "antd";
import { useState } from 'react';
import LoadingModal from "../../components/LoadingModal";
import request from "../../API/api";

function PageForm(props) {
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState({display: "none"});
  const [fileId, setFileId] = useState("")
  const [form] = Form.useForm()
  const handleSubmit = e => {
    e.preventDefault();
    props.form?.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };
  const handleClick = () => {
    //
  }
  const handleFinish = (values) => {
    //processing the data
    const choices = []
    if(values.questionType === "true-or-false") {
      let obj = {};
      if(values.answer === "true") {
        values.answer = 0
        choices.push({
          title: "صواب",
          isTrue: true
        })
        choices.push({
          title: "خطأ",
          isTrue: false
        })
      } else if(values.answer === "false") {
        values.answer = 0
        choices.push({
          title: "خطأ",
          isTrue: true
        })
        choices.push({
          title: "صواب",
          isTrue: false
        })
      }
    } else if(values.questionType === 'multiple') {
      let multpleChoices = Object.keys(values).filter(e => e.match(/multiple\d+/))
      multpleChoices.forEach((choice, i) => {
        if(choice === values.answer) {
          values.answer = i
          choices.push({
            title: values[choice],
            isTrue: true
          })
        } else {
          choices.push({
            title: values[choice],
            isTrue: false
          })
        }
        delete values[choice]
      })
      //console.log(multpleChoices, 'multpleChoices')
    }
    values.choices = choices;
    values.image = values.image.uid
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
      if(json.err) setAlert({display: "flex", type: "error", message:json.err.message ? json.err.message : "حدث خطا اثناء حفظ السؤال برجاء المحاولة مره اخرى"}) 
      else if(json.success) setAlert({display: "flex", type: "success", message:"تم الحفظ بنجاح"})
      
      setTimeout(() => {
        setOpenModal(false)
        if(!json.err) setAlert({display: "none"})
      }, 2000)
    })
    .catch(err => {
      alert("حدث خطا اثناء حفظ السؤال برجاء المحاولة مره اخرى")
    })
  }
  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <Alert 
      message={alert?.message}
      type={alert?.type} 
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        direction: "rtl",
        fontFamily: "'Cairo'",
        padding: "20px",
        alignItems: "center",
        justifyContent: "center",
        display:alert?.display,
        zIndex: 10000
      }} 
      showIcon
      description=""
      />
      <LoadingModal state={openModal} />

      <Form
        onFinish={handleFinish}
        onSubmit={handleSubmit}
        style={{
          paddingBottom: "90px"
        }}
        rules={[
          { required: true, message: ' ' },
        ]}
      >
        <ChooseLesson />
        <div className="sections-container">
          <TextArea name="LessonVocabulary" placeholder="مفردات الدرس...." title="مفردات الدرس" />
          <TextArea name="LessonPrepare" placeholder="اكتب تهيئة الدرس..." title="تهيئة الدرس" />
        </div>
        <div className="sections-container">
          <TextArea name="TeacherInstructions" placeholder="قم بكتابة تعليمات المعلم...." title="تعليمات المعلم" />
          <TextArea name="LessonClose" placeholder="قم بكتابة إغلاق الدرس..." title="إغلاق الدرس" />
        </div>
        <section className="section-body">
          <button type="submit" className="submit-btn btn" onClick={handleClick}>حفظ</button>
        </section>
      </Form>
    </div>
  );
}

export default PageForm;