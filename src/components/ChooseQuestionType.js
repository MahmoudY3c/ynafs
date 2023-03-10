import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Select, Button } from "antd";
import SelectBox from './SelectBox'
import QuestionFeld from './QuestionFeld'
import TrueOrFalse from './TrueOrFalse'
import Multiple from './Multiple'

class Archieve {
  constructor() {
    this._cache = {}
    this.errs = {
      NaN: "index parameter should to be a number",
      all:  "one of this parameeters {key, index, data} is missing please check your inputs",
      missingData:  "one of this parameeters {key, index} is missing please check your inputs"
    }
  }
  getAll() {
    return this._cache
  }
  get(key, index) {
    if (typeof index !== "number")return this.errs.NaN
    if (!key || !index) return this.errs.missingData
    this._cache[key] = [];
    return this._cache[key][index]
  }
  
  save(key, index, data) {
    if (typeof index !== "number")return this.errs.NaN
    if (key == undefined || index == undefined || data == undefined) return this.errs.all
    //console.log(index)
    if(this._cache[key] == undefined) {
      this._cache[key] = [];
    }
    this._cache[key][index] = data
    return this._cache
  }
  UseDefaultKey(key) {
    const self = this
    return function(index, data) {
      //optional to save or get
      if(data) self.save(key, index, data);
      return self._cache[key]?.[index]
    }
  }
}

Archieve = new Archieve();

const { Option } = Select;

let Question = function (props) {
  const { index } = props
  //always remeber previously choosed elements
  const elms = Archieve.UseDefaultKey("elms")
  const [Q, setQ] = useState(null);

  function handleChange(value) {
    let multiple = <>
      <QuestionFeld />
      <Multiple />
    </>,
      tof = <>
        <QuestionFeld />
        <TrueOrFalse />
      </>
    if (value.length) {
      if (value.includes("multiple")) {
        elms(index, {
          el: multiple,
          value: value
        })
        setQ(multiple)
      } else if (value.includes("true-or-false")) {
        elms(index, {
          el: tof,
          value: value
        })
        setQ(tof)
      }
    } else if (!value.length) {
      elms(index, {
        el: null,
        value: ''
      })
      setQ('')
    }
    console.log(elms(index), index)
    console.log(`selected ${value}, ${value.length}`);
  }
  return (
    <>
      <SelectBox
        placeholder="?????????? ?????? ????????????"
        title="?????????? ?????? ????????????"
        value={elms(index)?.value ? elms(index).value: ''}
        onChange={handleChange}
        mode="single"
        name="questionType"
      >
        <Option key="?????????? ?????? ????????????" value="">
          ?????????? ?????? ????????????.....
        </Option>
        <Option key="???? ???? ??????" value="true-or-false">
          ???? ???? ??????
        </Option>
        <Option key="???????????? ???? ??????????" value="multiple">
          ???????????? ???? ??????????
        </Option>
      </SelectBox>
      {
        elms(index)?.el
      }
    </>
  )
}

function ChooseQuestionType(props) {
  let [NewQuestion, setNewQuestion] = useState([Question])
  const QuestionTypeField = function () {
    return (
      <>
        {NewQuestion.map((Q, i) => <Q key={i} index={i} />)}
      </>
    )
  }
  const handleNewQuestion = useCallback(e => {
    setNewQuestion(prev => {
      return [...prev, Question]
    })
  }, [])

  return <>
    <QuestionTypeField />
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Button onClick={handleNewQuestion}>
        ?????????? ???????? ????????
      </Button> */}
    </div>
  </>
}

export default ChooseQuestionType;