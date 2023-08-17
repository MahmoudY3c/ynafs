import React from 'react';
import { Select } from "antd";
import SelectBox from './SelectBox';

const { Option } = Select;

function Question(props) {
  return (
    <>
      <SelectBox
        placeholder="اختار نوع السؤال"
        title="اختار نوع السؤال"
        onChange={props.onChange}
        mode="single"
        name="questionType"
        required={true}
      >
        <Option key="اختار نوع السؤال" value="">
          اختار نوع السؤال.....
        </Option>
        <Option key="صح او خطأ" value="true-or-false">
          صح او خطأ
        </Option>
        <Option key="اختيار من متعدد" value="multiple">
          اختيار من متعدد
        </Option>
        <Option key="سؤال مقالي" value="essay">
          سؤال مقالي
        </Option>
      </SelectBox>
    </>
  )
}

export default Question;