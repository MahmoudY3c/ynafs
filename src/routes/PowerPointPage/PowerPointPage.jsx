/* eslint-disable no-unused-vars */
import "../../css/style.css";
import React, { useState } from "react";
import { Form, Alert, Input, Typography } from "antd";
import LoadingModal from "../../components/LoadingModal";
import Nav from '../../components/Nav';
import useFetch from "../../hooks/useFetch";
import Choose from "../../components/Choose";
import { filterResponseData, handleMultiple, handleTrueOrFalse } from "../../handlers/handlers";
import request from "../../API/api";

function PowerPointPage() {
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
    drivePowerPointValue: null,
  });

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
          const filteredData = filterResponseData(data, true);
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

    console.log(arr);

    setOpenModal(true);

    request('/subjects', {
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
            // delete e[coneponentsState.levelValue][arr[1]];
            return { ...lessonsData }
          })
        }

        form.setFieldValue('drivePowerPoint', '');

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