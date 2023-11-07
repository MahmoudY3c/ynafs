import React from 'react';
import '../css/antd/antd.min.css'
import { Form, Select } from "antd";

function SelectBox(props) {
  return (
    <section className="section-body">
      <div>
        <h1 className="sections-title">
          {props.title}
        </h1>
      </div>
      <div className="container">
        <div className="select-container">
          <Form.Item
            name={props.name}
            hasFeedback
            rules={props.required ? props.required : [{ required: true, message: '' }]}
            value={props.value || ''}
            initialValue={props.value || ''}
          >
            <Select
              style={{ width: '100%' }}
              {...props}
              value={props.value || ''}
            >
              {props.children}
            </Select>
          </Form.Item> 
        </div>
      </div>
    </section>
  );
}

export default SelectBox;