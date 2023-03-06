import React, { useState, useEffect } from 'react';
import { Select, Spin } from "antd";
import SelectBox from './SelectBox.js'
import ChooseLevel from './ChooseLevel'
import request from '../API/api.js';
const { Option } = Select;

function ChooseLesson(props) {
  // const { data, isPending } = useFetch('http://ynafs.com:5000/api/get-lesson')
  const [children, setChildren] = useState(null);
  const [Level, setLevel] = useState(null)


  React.useEffect(() => {
    request('/get-lesson')
    .then(data => {
      let holder = {}
      let levels = [] , levelLessons;
      levels = data.forEach(e => {
        let level = e.level ? ' - ' + e.level : '';
        if(!holder[e.learningType+level]) {
          holder[e.learningType+level] = []
        } else if(holder[e.learningType+level]) {
          holder[e.learningType+level].push(e)
        }
      })
      console.log('====================================');
      console.log(holder);
      setChildren(holder);
      console.log('====================================');
      // setChildren(data)
    }).catch(err => {
      console.log('====================================');
      console.log(err.message);
      console.log('====================================');
    })
  }, [])

  function handleChange(value) {
    console.log('====================================');
    console.log(value);
    console.log('====================================');
    if (value.length) {
      setLevel(<ChooseLevel data={children} value={value} _form={props._form}/>)
    } else if (!value.length) {
      setLevel(null)
    }
  }
  return (
    <>
      <SelectBox
        title="اختار السنة الدراسية"
        placeholder="اختار السنة...."
        onChange={handleChange}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.props?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0}
        name="level"
      >
        {!children ? <Option style={{textAlign: "center"}} value=""><Spin style={{ margin: "auto" }} size="large" /></Option> : 
        Object.keys(children).map((key, i) => {
          return <Option key={i} value={key}>{key}</Option>
        })
        }
      </SelectBox>
      {Level}
    </>
  );
}


export default ChooseLesson;

/*
children?.map((i, index)=>{
          // let tree = i.tree ? ' - ' + i.tree : ''
          // let lesson = i.lesson ? ' - ' + i.lesson : '';
          let level = i.level ? ' - ' + i.level : '';
          // let t = i.learningType + level + ' - ' + i.subject + ' - ' + i.unit + lesson + tree;
          let t = i.learningType + level 
          return <Option key={index} value={i._id}>{t}</Option>
        }) 
*/