import React, { useState } from 'react';
import { Input, Form, Upload, Space, Button } from "antd"
import { UploadOutlined } from '@ant-design/icons';

const UploadBtn = ({ setTextField }) => {
  const handleChange = function(e) {
    setTextField(null)
  }
  const uploader = function(e) {
    console.log(e)
    fetch('/images', {
      method: "POST",
      body: e.file
    }).then(() => {
      alert("success")
    })
  }
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
      size="large"
    >
      <Upload
        listType="picture"
        maxCount={1}
        onChange={handleChange}
        customRequest={uploader}
      >
        <Button style={{ margin: '10px' }} icon={<UploadOutlined />} >قم برفع صورة</Button>
      </Upload>
    </Space>
  );
}
function QuestionFeld(props) {
  const [textField, setTextField] = useState(
    <Form.Item name="lesson_question"
      hasFeedback
      rules={[{ required: true, message: '' }]}
      style={{ maxWidth: "40%" }}
    >
      <Input type="text" className="text-field" placeholder="اكتب السؤال هنا..." />
    </Form.Item>
  )
  return (
    <section className="section-body">
      <div>
        <h1 className="sections-title">
          السؤال الخاص بالدرس
        </h1>
      </div>
      <div className="container">
        {textField}
        <Form.Item name="file" >
          <UploadBtn setTextField={setTextField} />
        </Form.Item>
      </div>
    </section>
  );
}

export default QuestionFeld;

