import React from 'react';
import { Select, Spin } from "antd";
import SelectBox from './SelectBox'
const { Option } = Select;

function ChooseLesson(props) {
  return (
    <>
      <SelectBox
        title="اختار السنة الدراسية"
        placeholder="اختار السنة...."
        onChange={props.onChange}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) => option.props?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0}
        name="level"
      >
        {props.loading ?
          <Option style={styles.spinnerOption} value="">
            <Spin style={styles.spinner} size="large" />
          </Option> :
          Object.keys(props.data).map((key, i) => {
            return <Option key={i} value={key}>{key}</Option>
          })
        }
      </SelectBox>
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
