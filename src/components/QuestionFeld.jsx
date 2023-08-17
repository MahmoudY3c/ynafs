import React, { useEffect } from 'react';
import { Input, Form } from "antd";

function QuestionFeld(props) {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.form && props.form.setFieldsValue({ "answer": undefined }), [])

  return (
    <section className="section-body">
      <div>
        <h1 className="sections-title">
          السؤال الخاص بالدرس
        </h1>
      </div>
      <div className="container" style={{ width: '60%', margin: 'auto' }}>
        {props.display &&
          <Form.Item
            name="question"
            hasFeedback
            rules={[{ required: true, message: '' }]}
          >
            <Input.TextArea style={styles.textarea} type="text" className="text-field" placeholder="اكتب السؤال هنا..." />
          </Form.Item>
        }
      </div>
    </section>
  );
}

const styles = {
  textarea: {
    minHeight: '20vh',
    backgroundColor: '#ddd !important',
    margin: "auto",
  }
}

export default QuestionFeld;

