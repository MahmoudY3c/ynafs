import React, { useState, useEffect, useRef } from 'react';
import { Input, Form, Upload, Space, Button } from "antd"
import { UploadOutlined } from '@ant-design/icons';

const UploadBtn = ({ setTextField }) => {
  const handleChange = function (e) {
    setTextField(null)
  }
  // console.log(fileList)
  const normFile = (e) => {
    console.log("Upload event:", e);
    return e.file
  };
  const uploader = function (e) {
    console.log(e);
    const data = new FormData()
    data.append('file', e.file)
    data.append('uid', e.file.uid)
    //e.onProgress()
    fetch('/images', {
      method: "POST",
      body: data
    }).then((e) => {
      return e.json()
    })
   .then(t => {
    //  console.log(t.fileId)
     e.onSuccess()
   })
  }
  return (
    <Space
      direction="vertical"
      style={{
        width: '80%',
      }}
      size="large"
    >

      <Form.Item name="image" getValueFromEvent={normFile}  >
        <Upload
          listType="picture"
          maxCount={1}
          onChange={handleChange}
          customRequest={uploader}
        >
          <Button style={{ margin: '10px' }} icon={<UploadOutlined />} >قم برفع صورة</Button>
        </Upload>
      </Form.Item>
    </Space>
  );
}

function QuestionFeld(props) {
  const [textField, setTextField] = useState(
    <Form.Item
      name="question"
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
        <UploadBtn setTextField={setTextField} />
      </div>
    </section>
  );
}

export default QuestionFeld;

