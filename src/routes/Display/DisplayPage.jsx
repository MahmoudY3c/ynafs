/* eslint-disable no-unused-vars */
import "../../css/style.css";
import React from "react";
import { Form, Card, Space, Button } from "antd";
import Nav from '../../components/Nav';
import Stepy from "../../components/Stepy";
import { handleSubmit } from "../../global/events/handleSubmit";
import { renderHandleDisplayPageFinish } from "./handleDisplayPageFinish";
import { handleHideModal } from "../../global/handlers/hideModal";
import { handleShowError } from "../../global/handlers/showError";
import LoaderModal from "../../components/LoaderModal";


function DisplayPage() {
  // form states
  const [form] = Form.useForm();
  const ref = React.createRef();
  // main states
  const [questions, setQuestions] = React.useState(null);

  // styles states
  const [openModal, setOpenModal] = React.useState(false);
  const [alert, setAlert] = React.useState({ display: false });

  // handlers
  const hideModal = handleHideModal({ setOpenModal, setAlert });
  const showError = handleShowError({ setAlert, hideModal });

  // events
  const handleDisplayPageFinish = renderHandleDisplayPageFinish({ setOpenModal, showError, setQuestions, hideModal });

  console.log('====================================');
  console.log(questions, 'questions ...............');
  console.log('====================================');

  return (
    <>
      <header>
        <Nav />
      </header>
      <h1 className="container">Display Questions Page</h1>
      
      <LoaderModal
        message={alert?.message}
        type={alert?.type}
        show={alert?.display}
        openModal={openModal}
        title="جاري البحث عن الاسئلة"
      />

      <Form
        onFinish={handleDisplayPageFinish}
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
        <Stepy form={form} />

        <section className="section-body">
          <button type="submit" className="submit-btn btn">بحـث</button>
        </section>
      </Form>

      {/******************************* show questions sections ****************************/}

      <Space direction="horizontal" wrap={true} align="center" style={{ justifyContent: 'center', padding: '20px', marginTop: '-95px' }}>
        {
          questions?.length && questions.map((q, index) => {
            const cardProps = q.question ? { title: q.question || '' } : q.image ? { cover: <img src={`/api/uploads/images/${q.image}?token=nH0t58dcuqjmQs2TSe8EqG12rz/9MZ4CFvFcXtyyAe8=`} alt="" /> } : {};
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
  textarea: {
    margin: "20px",
    width: '95%',
  }
};

export default DisplayPage;