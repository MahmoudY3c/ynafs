/* eslint-disable no-unused-vars */
import "../../css/style.css";
import React from "react";
import { Form, Alert, Input } from "antd";
import LoadingModal from "../../components/LoadingModal";
import Nav from '../../components/Nav';
import useFetch from "../../hooks/useFetch";
import Choose from "../../components/Choose";
import { handleMultiple, handleTrueOrFalse } from "../../handlers/handlers";
// import ChooseLesson from '../../components/ChooseLesson'
// import ChooseLevel from "../../components/ChooseLevel";
import QuestionFeld from "../../components/QuestionFeld";
import Multiple from "../../components/Multiple";
import TrueOrFalse from "../../components/TrueOrFalse";
// import Question from "../../components/Question";
import UploadBtn from "../../components/UploadBtn";
import TextArea from "antd/es/input/TextArea";
import { setItems, setItemsActions, setDrivePowerPointValue, setLoading, setError, setTrees } from "../../Redux/features/items/slice";
import { useSelector, useDispatch } from "react-redux";
import { questionTypes } from "../../JSON";
import Stepy from "../../components/Stepy";
import { renderHandleMainFormFinish } from "./handleMainFormFinish";
import { handleSubmit } from "../../global/events/handleSubmit";
import { renderHandleDisplayComponent } from "../../global/events/handleDisplayComponent";
import { renderHandleQuestionsChange } from "./handleQuestionChange";


function MainForm() {
  // form states
  const [form] = Form.useForm();
  const ref = React.createRef()
  // styles states
  const [openModal, setOpenModal] = React.useState(false);
  const [alert, setAlert] = React.useState({ display: "none" });
  // conponents states
  const dispatch = useDispatch();
  const { items: componentsState, loading, error, lessonsData, treesData } = useSelector(state => state.items);
  const handleDisplayComponent = renderHandleDisplayComponent({ componentsState, form, dispatch });
  const handleMainFormFinish = renderHandleMainFormFinish({ handleTrueOrFalse, handleMultiple, setOpenModal, dispatch, setDrivePowerPoint: value => dispatch(setDrivePowerPointValue(value)), setAlert, treesData, selectedSubject: componentsState?.subjectValue?.split('@@')?.[0], lessonsData })
  const handleQuestionChange = renderHandleQuestionsChange({ dispatch, form, setItems, componentsState, questionTypes });
  const handleUploadChange = () => dispatch(setItems({ ...componentsState, displayQestionFeld: false }));
  const { LessonPrepare, LessonVocabulary } = treesData?.find(e => e._id === componentsState.treeValue) || {};


  useFetch({
    url: `/trees?lesson=${componentsState.lessonValue}`,
    dependancy: [componentsState.lessonValue],
    options: {
      condition: componentsState.lessonValue,
      beforeStart: () => dispatch(setLoading({ status: true, item: 'trees' })),
      afterend: () => dispatch(setLoading({ status: false, item: 'trees' })),
    },
    callback({ data, error }) {

      if (error) {
        return dispatch(setError({
          error,
          area: 'trees'
        }))
      }

      dispatch(setTrees(data))
    },
  });


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
        onFinish={handleMainFormFinish}
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

        {componentsState.subjectValue &&
          <>
            {
              (
                !lessonsData[componentsState.levelValue]
                  ?.[componentsState.subjectValue.split('@@')[0]]
                  ?.drivePowerPoint
              ) &&
              <section className="section-body">
                <div className="container">
                  <div className="select-container">
                    <Form.Item
                      name="drivePowerPoint"
                      rules={[{ required: false, message: '' }]}
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
              value={componentsState.lessonValue || ''}
              data={lessonsData[componentsState.levelValue][componentsState.subjectValue.split('@@')[0]]}
              items={{ item: ["unit", "chapter"], value: "_id" }}
              title='اختر الفصل / الوحدة'
              onChange={(value) => handleDisplayComponent(value, setItemsActions.setItems, 'lessonValue', [
                'treeValue',
                'trueOrFalse',
                'multiple',
                'essay',
                'QuestionTypeValue',
              ])}
            />
          </>
        }
        {componentsState.lessonValue &&
          <>
            <Choose
              name="tree"
              loading={loading.item === 'trees' ? loading.status : null}
              data={treesData}
              value={componentsState.treeValue || ''}
              items={{ item: 'title', value: "_id" }}
              title='اختر الدرس'
              onChange={(value) => handleDisplayComponent(value, setItemsActions.setItems, 'treeValue', [
                'QuestionTypeValue',
                'trueOrFalse',
                'multiple',
                'essay',
              ])}
            />
          </>
        }

        {componentsState.treeValue &&
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

        {(componentsState.multiple || componentsState.trueOrFalse || componentsState.essay) &&
          <>
            <QuestionFeld form={form} display={componentsState.displayQestionFeld} />
            {componentsState.essay &&
              <QuestionFeld name="essayAnswer" title="اجابة السؤال" form={form} display={componentsState.displayQestionFeld} />
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
        {componentsState.multiple && <Multiple />}
        {componentsState.trueOrFalse && <TrueOrFalse />}

        {(componentsState.treeValue && (!LessonPrepare || !LessonVocabulary)) &&
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

export default MainForm;