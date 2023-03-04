import React, { useState, useEffect } from 'react';
import { Form, Radio, Input, Button } from 'antd';
//import Archieve from '../classes/Archieve';
//initializing the archive to remeber user inputs
class Archieve {
  constructor() {
    this._cache = {}
    this.errs = {
      NaN: "index parameter should to be a number",
      all: "one of this parameeters {key, index, data} is missing please check your inputs",
      missingData: "one of this parameeters {key, index} is missing please check your inputs"
    }
  }
  get getAll() {
    return this._cache
  }
  getOne(key, index) {
    if (typeof index !== "number") return this.errs.NaN
    if (!key || !index) return this.errs.missingData
    //this._cache[key] = [];
    return this._cache[key]?.[index]
  }
  get() {
    return this._cache
  }
  set(value) {
    this._cache = value
  }
  save(key, index, data, opt) {
    //if (typeof index !== "number")return this.errs.NaN
    if (key == undefined || index == undefined || data == undefined) return this.errs.all
    //console.log(index)
    if (this._cache[key] == undefined) {
      //option to create object instead of array
      if (opt) this._cache[key] = {};
      else this._cache[key] = [];
    }
    this._cache[key][index] = data
    return this._cache
  }
  UseDefaultKey(key, opt) {
    const self = this
    return function (index, data) {
      //opyional to use object instead of array
      if (opt === "createObject") opt = true
      //optional to save or get
      if (data) self.save(key, index, data, opt);
      return self._cache[key]?.[index]
    }
  }
}
Archieve = new Archieve();

function Multiple(props) {
  let [options, setOptions] = useState([]);
  let [checked, setChecked] = useState("");
  const radioValues = Archieve.UseDefaultKey("radioValues");
  const inputValues = Archieve.UseDefaultKey("inputValues", "createObject");
  const numberOfInputs = Archieve.UseDefaultKey("numberOfInputs");
  function onTextChange(e) {
    inputValues(e.target.name, e.target.value)
  }
  //const [isSelected, setIsSelected] = useState(false);
  console.log(numberOfInputs(0))
  let n = numberOfInputs(0) ? numberOfInputs(0) : 3
  if (options.length === 0) {
    for (let i = 0; i < n; i++) {
      let item = "multiple" + i
      inputValues(item, '')
      radioValues("option" + i, false);
      numberOfInputs(0, i + 1)
      options.push(
        <div className="options-container" key={i}>
          <Radio value={"multiple" + i} name={"option" + i} />
          <Form.Item name={item} noStyle={true}
            hasFeedback
            rules={[{ required: true, message: '' }]}
          >
            <Input placeholder="اكتب الاجابة ..." onChange={onTextChange} value={inputValues(item)} />
          </Form.Item>
        </div>
      )
    }
  }
  function onChange(e) {
    //console.log(isSelected, e.target.checked, e.target.value, 'isSelectedisSelectedisSelected')
    setChecked(e.target.value);
    radioValues(e.target.name, e.target.value)
    console.log(`checked = ${e.target.checked}, value = ${e.target.value}`);
  }
  function AddOne(e) {
    let opts = [...options]
    let len = opts.length + 1
    let item = "multiple" + len
    numberOfInputs(0, len)
    opts.push(
      <div className="options-container" key={len}>
        <Radio value={"multiple" + len} name={"option" + len} />
        <Form.Item name={item} noStyle={true}
            hasFeedback
            rules={[{ required: true, message: '' }]}
          >
        <Input placeholder="اكتب الاجابة ..." name={item} onChange={onTextChange} value={inputValues(item)} />
        </Form.Item>
      </div>
    )
    setOptions(opts)
  }
  console.log(Archieve.getAll)
  return (
    <section className="section-body">
      <h1 className="sections-title">
        اختيار من متعدد
      </h1>
      <div className="container-flex-multiple">
        <Button type='primary' onClick={AddOne}>
          +
        </Button>
        <Form.Item
          name="choosed_answer"
          hasFeedback
          rules={[{ required: true, message: '' }]}
        >
          <Radio.Group onChange={onChange} value={checked} style={{ width: "100%" }}>
            {options.map(opt => {
              return opt
            })}
          </Radio.Group>
        </Form.Item>
      </div>
    </section>
  );
}

export default Multiple;
