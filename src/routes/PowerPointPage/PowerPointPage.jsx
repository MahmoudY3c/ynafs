/* eslint-disable no-unused-vars */
import "../../css/style.css";
import React from "react";
import { Form, Alert, Input } from "antd";
import LoadingModal from "../../components/LoadingModal";
import Nav from '../../components/Nav';
import Stepy from "../../components/Stepy";
import { useDispatch, useSelector } from "react-redux";
import { setDrivePowerPointValue } from "../../Redux/features/items/slice";
import { handlePowerPointFinish } from "./handlePowerPointFinish";

function PowerPointPage() {
  // form states
  const [form] = Form.useForm();
  const ref = React.createRef()
  // styles states
  const [openModal, setOpenModal] = React.useState(false);
  const [alert, setAlert] = React.useState({ display: "none" });

  // conponents states
  const dispatch = useDispatch();
  const { items: componentsState, loading, loadingItem, error, errorArea, categories, lessonsData, treesData } = useSelector(state => state.items);
  const handleSubmit = e => e.preventDefault();
  // const [drivePowerPoint, setDrivePowerPoint] = React.useState([]);
  // const drive = {
  //   value: lessonsData
  //     ?.[componentsState?.levelValue]
  //     ?.[componentsState?.subjectValue?.split('@@')?.[0]]
  //     ?.drivePowerPoint
  // };

  // const isDriveAvailable = drivePowerPoint.length > 0 ?
  //   drivePowerPoint.find(e => {
  //     if (
  //       e.level === componentsState?.levelValue
  //       && e.subject === componentsState?.subjectValue?.split('@@')?.[0]
  //     ) {
  //       return e;
  //     }

  //     return lessonsData
  //       ?.[componentsState?.levelValue]
  //       ?.[componentsState?.subjectValue?.split('@@')?.[0]]
  //       ?.drivePowerPoint;
  //   })
  //   : drive;

  console.log(lessonsData?.[componentsState?.levelValue]
    ?.[componentsState?.subjectValue?.split('@@')?.[0]]
    ?.drivePowerPoint)
  const handleFinish = handlePowerPointFinish({ setAlert, setOpenModal, dispatch, form, selectedSubject: componentsState?.subjectValue?.split('@@')?.[0], setDrivePowerPoint: value => dispatch(setDrivePowerPointValue(value)) });


  return (
    <>
      <header>
        <Nav />
      </header>
      <h1 className="container">PowerPoint Page</h1>
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
        <Stepy form={form} />
        {componentsState.subjectValue &&
          <>
            {
              /* !isDriveAvailable?.value */
              !lessonsData[componentsState.levelValue]
                ?.[componentsState.subjectValue.split('@@')[0]]
                ?.drivePowerPoint
              &&
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
          </>
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

export default PowerPointPage;