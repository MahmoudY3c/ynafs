import React, { useState } from 'react';
import { Form, Radio } from 'antd';

function TrueOrFalse(props) {
  let [checked, setChecked] = useState("")
  function onChange(e) {
    setChecked(e.target.value)
    console.log(`checked = ${e.target.checked}, value = ${e.target.name}`);
  }
  return (
    <section className="section-body">
      <h1 className="sections-title">
        صح ام خطا
      </h1>
      <div className="container-flex">
        <Form.Item
          name="answer"
          hasFeedback
          rules={[{ required: true, message: 'اختر اجابة' }]}
        >
          <Radio.Group value={checked} onChange={onChange} >
            <div className="options-container">
              <Radio name="true" value="true">صواب</Radio>
            </div>
            <div className="options-container">
              <Radio name="false" value="false">خطأ</Radio>
            </div>
          </Radio.Group>
        </Form.Item>
      </div>
    </section>
  );
}




export default TrueOrFalse;