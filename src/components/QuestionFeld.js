import React, { useState, useEffect } from 'react';
import { Input, Form, Upload, Space, Button } from "antd"
import { UploadOutlined } from '@ant-design/icons';

const UploadBtn = ({ setTextField, setVal, val }) => {
  const handleChange = function(e) {
    //console.log(e, 'change');
    setTextField(null)
  }
  const uploader = function(e) {
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
      console.log(t.fileId)
      e.onSuccess()
      normFile(t)
      setVal(e => t.fileId)
      console.log(val)
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
      <Upload
        listType="picture"
        maxCount={1}
        onChange={handleChange}
        //action="/images"thumbUrl
        customRequest={uploader}
        value={val}
        //name="image"
      >
        <Button style={{ margin: '10px' }} icon={<UploadOutlined />} >قم برفع صورة</Button>
      </Upload>
    </Space>
  );
}
const normFile = (e) => {
  console.log("Upload event:", e);
  return e 
};
function QuestionFeld(props) {
  let [v, setVl] = useState("fileList");
  useEffect(() => setVl(value => value), [v]);
  console.log(v, 'kmmmmmmmmmmmmmmmmmm')
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
        <Form.Item name="image" valuePropName='fileId' label={v} getValueFromEvent={normFile} >
          <UploadBtn setTextField={setTextField} setVal={setVl} val={v} />
        </Form.Item>
      </div>
    </section>
  );
}

export default QuestionFeld;

