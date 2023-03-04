import React, { useState, useEffect } from 'react';
import { Checkbox, Radio, Input, Button } from 'antd';

function Multiple(props) {
  let [options, setOptions] = useState([]);
  let [checked, setChecked] = useState(false)
  const [isSelected, setIsSelected] = useState(false);
  if (options.length === 0) {
    for (let i = 0; i < 3; i++) {
      let item = "multiple"+i
      options.push(
        <div className="options-container" key={i}>
          <Checkbox onChange={onChange} name={"multiple"+i} disabled={isSelected ? isSelected !== item : false} />
          <Input placeholder="اكتب الاجابة ..." />
        </div>
      )
    }
  }
  function onChange(e) {
    //e.target.setAttribute('checked', true) 
    console.log(isSelected, e.target.checked, e.target.name, 'isSelectedisSelectedisSelected')
    if (e.target.checked) {
      setIsSelected(true);
    } else {
      setIsSelected(null);
    }
    console.log(`checked = ${e.target.checked}, value = ${e.target.name}`);
  }
  function AddOne(e) {
    let opts = [...options]
    let len = opts.length + 1
    // let len = opts.length + 1
    //   console.log(options, len)
      let item = "multiple"+len
    opts.push(
      <div className="options-container" key={len}>
        <Checkbox onChange={onChange} name={"multiple"+len} checked={isSelected ? isSelected !== item : false} />
        <Input placeholder="اكتب الاجابة ..." />
      </div>
    )
    setOptions(opts)
  }
  return (
    <section className="section-body">
      <h1 className="sections-title">
        اختيار من متعدد
      </h1>
      <div className="container-flex-multiple">
        <Button type='primary' onClick={AddOne}>
          +
        </Button>
        {options.map(opt => {
          return opt
        })}
      </div>
    </section>
  );
}

export default Multiple;

/*
import { Radio } from 'antd';

class App extends React.Component {
  state = {
    value: 1,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    );
  }
}

ReactDOM.render(<App />, mountNode);
*/