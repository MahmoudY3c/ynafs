import React from 'react';
import { Select, Spin } from "antd";
import SelectBox from './SelectBox'
// import useFetch from '../hooks/useFetch';
const { Option } = Select;

function Choose(props) {
  const { item, value } = props.items || {};
  return (
    <>
      <SelectBox
        title={props.title || "اختار السنة الدراسية"}
        placeholder={props.placeholder || props.title || "اختار السنة...."}
        onChange={props.onChange}
        optionFilterProp="children"
        filterOption={(input, option) => {
          console.log('====================================');
          console.log(option);
          console.log('====================================');
          return option?.children?.indexOf(input?.toLowerCase()) >= 0
        }}
        name={props.name}
        showSearch
        mode={props.mode || 'default'}
        value={props.value || ''}
      >
        {(props.loading) ?
          <Option style={styles.spinnerOption} value="">
            <Spin style={styles.spinner} size="large" />
          </Option> :
          <>
            <Option className="first-opt" value={props.value || ''}>{props.title || "اختار السنة الدراسية"}......</Option>
            {
              // item && value ? props.data?.map(generateOption) : Object.keys(props.data || { }).map(generateOption)
              ((item && value) ? props.data : Object.keys(props.data || {}))?.map((res, i) => {
                return <Option key={((item && typeof item === 'object') ? item.map(e => res?.[e]).filter(e => e).join(' - ') : res?.[item]) || res + i} value={res?.[value] || res}>{
                  ((item && typeof item === 'object') ? item.map(e => res?.[e]).filter(e => e).join(' - ') : res?.[item]) || res}</Option>
              })
            }
          </>
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
