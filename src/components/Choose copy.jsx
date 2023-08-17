import React from 'react';
import { Select, Spin } from "antd";
import SelectBox from './SelectBox'
import useFetch from '../hooks/useFetch';
const { Option } = Select;

function Choose(props) {
  const { item, value } = props.items;
  const { data = props.data, loading = props.loading } = useFetch(props.url ? props.url : null, props.options ? props.options : null);

  return (
    <>
      <SelectBox
        title={props.title || "اختار السنة الدراسية"}
        placeholder={props.placeholder || props.title || "اختار السنة...."}
        onChange={props.onChange}
        optionFilterProp="children"
        filterOption={(input, option) => option?.children?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0}
        name={props.name}
        showSearch
      >
        {loading ?
          <Option style={styles.spinnerOption} value="">
            <Spin style={styles.spinner} size="large" />
          </Option> :
          data.map((obj, i) => {
            return <Option key={obj[item]} value={obj[value]}>{obj[item]}</Option>
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


export default Choose;
