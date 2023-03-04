import "../../css/style.css";
import ChooseLesson from '../../components/ChooseLesson.js'
import Nav from '../../components/Nav.js'
import TextArea from '../../components/TextArea.js'
import { Form, Alert } from "antd";
import Raect, { useState } from 'react';
import LoadingModal from "../../components/LoadingModal";

function PageForm(props) {
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState({display: "none"})
  const handleSubmit = e => {
    e.preventDefault();
    props.form?.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };
  const handleClick = () => {
    //
  }
  const handleFinish = (values: any) => {
    
    console.log('Received values of form: ', values);
    setOpenModal(true);
    fetch('/add-question', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(values)
    })
    .then(e => e.json())
    .then(json => {
      console.log(json)
      if(json.err) setAlert({display: "flex", type: "error", message:"حدث خطا اثناء حفظ السؤال برجاء المحاولة مره اخرى"}) 
      else if(json.success) setAlert({display: "flex", type: "success", message:"تم الحفظ بنجاح"})
      
      setTimeout(() => {
        setOpenModal(false)
        if(!json.err) setAlert({display: "none"})
      }, 2000)
    })
    .catch(err => {
      alert("حدث خطا اثناء حفظ السؤال برجاء المحاولة مره اخرى")
    })
    setTimeout(() => {
      // setOpenModal(false)
    }, 10000)
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
          { required: true, message: '...sda91sa5' },
        ]}
      >

        <ChooseLesson />
        <div className="sections-container">
          <TextArea name="meanings" placeholder="مفردات الدرس...." title="مفردات الدرس" />
          <TextArea name="preparing" placeholder="اكتب تهيئة الدرس..." title="تهيئة الدرس" />
        </div>
        <div className="sections-container">
          <TextArea name="prof_Insreuctions" placeholder="قم بكتابة تعليمات المعلم...." title="تعليمات المعلم" />
          <TextArea name="lesson_closing" placeholder="قم بكتابة إغلاق الدرس..." title="إغلاق الدرس" />
        </div>
        <section className="section-body">
          <button type="submit" className="submit-btn btn" onClick={handleClick}>حفظ</button>
        </section>
      </Form>
    </div>
  );
}

export default PageForm;



/*
import React from 'react';
import { Alert, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Alert message="Success Tips" type="success" showIcon />
    <Alert message="Informational Notes" type="info" showIcon />
    <Alert message="Warning" type="warning" showIcon closable />
    <Alert message="Error" type="error" showIcon />
    <Alert
      message="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
    <Alert
      message="Informational Notes"
      description="Additional description and information about copywriting."
      type="info"
      showIcon
    />
    <Alert
      message="Warning"
      description="This is a warning notice about copywriting."
      type="warning"
      showIcon
      closable
    />
    <Alert
      message="Error"
      description="This is an error message about copywriting."
      type="error"
      showIcon
    />
  </Space>
);

export default App;


import { Form, Row, Col, Input, Button, Icon } from 'antd';

class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  // To generate mock Form.Item
  getFields() {
    const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
          <Form.Item label={`Field ${i}`}>
            {getFieldDecorator(`field-${i}`, {
              rules: [
                {
                  required: true,
                  message: 'Input something!',
                },
              ],
            })(<Input placeholder="placeholder" />)}
          </Form.Item>
        </Col>,
      );
    }
    return children;
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              Clear
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
ReactDOM.render(
  <div>
    <WrappedAdvancedSearchForm />
    <div className="search-result-list">Search Result List</div>
  </div>,
  mountNode,
);
*/