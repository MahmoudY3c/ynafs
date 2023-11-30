import React, { useEffect } from 'react';
import { Input, Form } from "antd";
import TextEditor, { handleGetQuillValue } from './TextEditor/TextEditor';

function QuestionFeld(props) {
  const [quill, setQuill] = React.useState(null);
  const isMath = props.subject ? props.subject.match(/رياضيات/i) : null;


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.form && props.form.setFieldsValue({ "answer": undefined }), [])

  return (
    <section className="section-body">
      <div>
        <h1 className="sections-title">
          {props.title || 'السؤال الخاص بالدرس'}
        </h1>
      </div>
      <div className="container" style={{ width: '60%', margin: 'auto' }}>
        {props.display &&
          (
            <>
              <Form.Item
                name={props.name || "question"}
                rules={[{ required: true, message: 'please enter question' }]}
                getValueFromEvent={isMath ? (ev) => handleGetQuillValue(ev, quill) : (ev) => ev.target.value}
              >
                {isMath
                  ? <TextEditor id={props.id} quill={quill} setQuill={setQuill} />
                  : <Input.TextArea style={styles.textarea} type="text" className="text-field" placeholder="اكتب السؤال هنا..." />
                }
              </Form.Item>
            </>
          )
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

