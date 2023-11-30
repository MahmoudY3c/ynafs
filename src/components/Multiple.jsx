import React, { useState } from 'react';
import { Form, Radio, Input, Button } from 'antd';
import Archieve from '../classes/Archieve';
import TextEditor, { handleGetQuillValue } from './TextEditor/TextEditor';
import { uniqueId } from '../handlers/textEditor';
//initializing the archive to remeber user inputs
const archieve = new Archieve();

function Multiple(props) {
  let [options, setOptions] = useState([]);
  let [checked, setChecked] = useState("");
  const isMath = props.subject ? props.subject.match(/رياضيات/i) : null;

  console.log(isMath, props.subject);

  const radioValues = archieve.UseDefaultKey("radioValues");
  const inputValues = archieve.UseDefaultKey("inputValues", "createObject");
  const numberOfInputs = archieve.UseDefaultKey("numberOfInputs");

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
        <div className="options-container" key={'options-' + i}>
          <div key={'div-' + i}>
            <Form.Item name={item} noStyle={true}
              hasFeedback
              rules={[{ required: true, message: 'please fill input' }]}
              getValueFromEvent={isMath ? (ev) => handleGetQuillValue(ev) : (ev) => ev.target.value}
              key={'Item-' + i}
            >
              {isMath
                ? <TextEditor key={'key-' + i} id={props.id + '-' + i} toolbar={{ align: 'right' }} />
                : <Input key={'Item-' + i} placeholder="اكتب الاجابة ..." onChange={onTextChange} value={inputValues(item)} />
              }
            </Form.Item>
          </div>
          <Radio value={"multiple" + i} name={"option" + i} key={'multiple-' + i} />
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
        <Form.Item
          name={item}
          noStyle={true}
          hasFeedback
          rules={[{ required: true, message: 'please fill input' }]}
          getValueFromEvent={isMath ? (ev) => handleGetQuillValue(ev) : (ev) => ev.target.value}
        >
          {isMath
            ? <TextEditor id={props.id + '-' + uniqueId()} toolbar={{ align: 'right' }} />
            : <Input placeholder="اكتب الاجابة ..." name={item} onChange={onTextChange} value={inputValues(item)} />
          }
        </Form.Item>
        <Radio value={"multiple" + len} name={"option" + len} />
      </div>
    )
    setOptions(opts)
  }
  // console.log(archieve.getAll)
  return (
    <section className="section-body">
      <h1 className="sections-title">
        اختيار من متعدد
      </h1>
      <div className="container-flex-multiple">
        <div style={{ direction: 'rtl' }}>
          <Button type='primary' onClick={AddOne}>
            +
          </Button>
        </div>
        <Form.Item
          name="answer"
          hasFeedback
          rules={[{ required: true, message: 'اختر اجابة' }]}
        >
          <Radio.Group onChange={onChange} value={checked} style={{ width: "100%" }}>
            {options.map(opt => {
              // console.log(opt)
              return opt
            })}
          </Radio.Group>
        </Form.Item>
      </div>
    </section>
  );
}

export default Multiple;
