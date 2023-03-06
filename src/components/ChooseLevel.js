import React, { useState, useEffect } from 'react';
import { Select, Spin } from "antd";
import SelectBox from './SelectBox.js';
import ChooseQuestionType from './ChooseQuestionType';
const { Option } = Select;

function ChooseLevel(props) {
  const {data, value} = props
  const [QuestionType, setQuestionType] = useState(null)
  function handleChange(value) {
    if (value.length) {
      setQuestionType(true)
    } else if (!value.length) {
      setQuestionType(null)
    }
  }
  console.log(props._form,'______props._form__________');
  return (
    <>
      <SelectBox
        title="اختار الدرس الذى تريده"
        placeholder="اختار الدرس...."
        onChange={handleChange}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        name="lesson"
        required={true}
      >
        {data[value].map((i)=>{
          let tree = i.tree ? ' - ' + i.tree : ''
          let lesson = i.lesson ? ' - ' + i.lesson : '';
          let t =  i.subject + ' - ' + i.unit + lesson + tree;
          return <Option key={'"' + t + '"'} value={i._id}>{t}</Option>
        }) }
      </SelectBox>
      {QuestionType ? <ChooseQuestionType f={props._form} /> : QuestionType}
    </>
  );
}


export default ChooseLevel;

