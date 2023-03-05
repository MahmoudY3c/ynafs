import React, { useState, useEffect } from 'react';
import { Select, Form } from "antd";
import SelectBox from './SelectBox.js'
import ChooseQuestionType from './ChooseQuestionType'
const { Option } = Select;

function ChooseLesson(props) {
  const [children, setChildren] = useState(
    [
      <Option key={0} value="">
        اختار الدرس....
      </Option>
    ]
  );
  const [QuestionType, setQuestionType] = useState(null)
  useEffect(() => {
    fetch("/get-lesson")
      .then(e => e.json())
      .then(lessons => {
        let t = '', arr = [...children]
        for (let i of lessons) {
          t = i.learningType + ' - ' + i.level + ' - ' + i.subject + ' - ' + i.unit + ' - ' + i.lesson;
          children.push(<Option key={'"' + t + '"'} value={i._id}>{t}</Option>);
        }
        setChildren(arr)
      })
  }, [])

  function handleChange(value) {
    if (value.length) {
      setQuestionType(<ChooseQuestionType />)
    } else if (!value.length) {
      setQuestionType(null)
    }
    // console.log(`selected ${value.length}, ${value}`);
  }
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
        >
          {children}
        </SelectBox>
      {QuestionType}
    </>
  );
}


export default ChooseLesson;

