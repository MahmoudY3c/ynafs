import React from 'react';
import { Select, Spin } from "antd";
import SelectBox from './SelectBox'
// import useFetch from '../hooks/useFetch';
const { Option } = Select;

function Choose(props) {
  const { item, value } = props.items || {};
  // let { data, loading} = useFetch(props.url ? props.url : null, props.options ? props.options : null);
  // function generateOption(res) {
  //   if (item && typeof item === 'object') {
  //     const optionText = item.map(e => res?.[e]).filter(e => e).join('-');
  //     return <Option key={optionText || res} value={res?.[value] || res}>{optionText || res}</Option>;
  //   } else {
  //     return <Option key={res?.[item] || res} value={res?.[value] || res}>{res?.[item] || res}</Option>;
  //   }
  // }
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
        mode={props.mode || 'default'}
        value={props.value || ''}
        // defaultValue={props.value || ''}
      >
        {(props.loading) ?
          <Option style={styles.spinnerOption} value="">
            <Spin style={styles.spinner} size="large" />
          </Option> :
          <>
            <Option style={styles.spinnerOption} value={props.value || ''}>......</Option>
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
