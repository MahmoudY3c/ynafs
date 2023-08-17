import React from 'react';
import { Select } from "antd";
import SelectBox from './SelectBox';
const { Option } = Select;

function ChooseLevel(props) {
  const { value } = props;
  return (
    <>
      {props.data &&
        <>
          <SelectBox
            title="اختار الدرس الذى تريده"
            placeholder="اختار الدرس...."
            onChange={props.onChange}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            name="lesson"
            required={true}
          >
            {props.data[value].map((i) => {
              let tree = i.tree ? ' - ' + i.tree : ''
              let lesson = i.lesson ? ' - ' + i.lesson : '';
              let t = i.subject + ' - ' + i.unit + lesson + tree;
              return <Option key={'"' + t + '"'} value={i._id}>{t}</Option>
            })}
          </SelectBox>
        </>
      }
    </>
  );
}


export default ChooseLevel;

