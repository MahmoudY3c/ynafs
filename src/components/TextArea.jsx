import React from 'react';
import { Input, Form } from "antd";

function TextArea(props) {
  return (
    <section className="section-body">
      <div className="container">
        <h1 className="textarea-header">{props.title}</h1>
        <Form.Item name={props.name}
          hasFeedback
          rules={[{ required: true, message: '' }]}
        >
          <Input.TextArea style={{
            minHeight: '20vh',
            backgroundColor: '#ddd !important',
            margin: "auto"
          }} placeholder={props.placeholder} />
        </Form.Item>

      </div>
    </section>
  );
}

export default TextArea;