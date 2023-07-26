import React, { useState, useEffect } from 'react';
import { Select, Spin } from "antd";
import SelectBox from './SelectBox.js'
import ChooseLevel from './ChooseLevel'
import request from '../API/api.js';
const { Option } = Select;

function ChooseLesson(props) {
  const [children, setChildren] = useState(null);
  const [Level, setLevel] = useState(null)

  React.useEffect(() => {
    request('/get-lesson')
      .then(data => {
        let holder = {}
        //filtering the data
        data.forEach(e => {
          let level = e.level ? ' - ' + e.level : '';
          if (!holder[e.learningType + level]) {
            holder[e.learningType + level] = []
          } else if (holder[e.learningType + level]) {
            holder[e.learningType + level].push(e)
          }
        })
        setChildren(holder);
      }).catch(err => {
        alert(err.message);
      })
  }, [])

  function handleChange(value) {
    console.log('====================================');
    console.log(value, '***************************');
    console.log('====================================');
    if (value.length) {
      setLevel(<ChooseLevel data={children} value={value} _form={props._form} />)
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
        {!children ?
          <Option style={styles.spinnerOption} value="">
            <Spin style={styles.spinner} size="large" />
          </Option> :
          //after fetching the data remove spinner and use default options
          Object.keys(children).map((key, i) => {
            return <Option key={i} value={key}>{key}</Option>
          })
        }
      </SelectBox>
      {Level}
    </>
  );
}

const styles = {
  spinnerOption: {
    textAlign: "center",
  },
  spinner: {
    margin: "auto",
  }
}


export default ChooseLesson;
