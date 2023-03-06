import React, { useState, useEffect } from 'react';
import { Select, Spin } from "antd";
import SelectBox from './SelectBox.js'
import ChooseQuestionType from './ChooseQuestionType'
import request from '../API/api.js';
import useFetch from '../helper/useFetch.jsx';
const { Option } = Select;

const Main_API_CALL = {
  url: 'http://ynafs.com:5000/api/get-lesson',

}

function ChooseLesson(props) {
  // const { data, isPending } = useFetch('http://ynafs.com:5000/api/get-lesson')
  const [children, setChildren] = useState(null);
  const [QuestionType, setQuestionType] = useState(null)


  React.useEffect(() => {
    request('/get-lesson')
    .then(data => {
      setChildren(data)
    }).catch(err => {
      console.log('====================================');
      console.log(err.message);
      console.log('====================================');
    })


  }, [])
  console.log('====================================');
  console.log(children);
  console.log('====================================');




  // useEffect(() => {
  //   request("/get-lesson")
  //     .then(lessons => {
  //       if (children == null) {
  //         setChildren([])
  //       }
  //       console.log(lessons, "data")
  //       setChildren(lessons)


  //     })
  // }, [])
  // console.log(children, 'after fetch');
  // const addToBody = () => {
  //   document.write(JSON.stringify(children))
  // }


  // useEffect(() => {
  //   addToBody()
  // }, [])

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
        {!children ? <Option style={{textAlign: "center"}} value=""><Spin style={{ margin: "auto" }} size="large" /></Option> : children?.map((i)=>{
          let tree = i.tree ? ' - ' + i.tree : ''
          let lesson = i.lesson ? ' - ' + i.lesson : '';
          let level = i.level ? ' - ' + i.level : '';
          let t = i.learningType + level + ' - ' + i.subject + ' - ' + i.unit + lesson + tree;
          return <Option key={'"' + t + '"'} value={i._id}>{t}</Option>
        }) }
      </SelectBox>
      {QuestionType}
    </>
  );
}


export default ChooseLesson;

