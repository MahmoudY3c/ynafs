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
          return option?.children?.indexOf(input?.toLowerCase()) >= 0
        }}
        name={props.name}
        showSearch
        mode={props.mode || 'default'}
        value={props.value || ''}
        required={props.required}
      >
        {(props.loading) ?
          <Option style={styles.spinnerOption} value="">
            <Spin style={styles.spinner} size="large" />
          </Option> :
          <>
            <Option className="first-opt" value={props.value || ''}>{props.title || "اختار السنة الدراسية"}......</Option>
            {
              (
                // if there's an item and value then the data is array and you can map else get the object keys as array to use them
                (item && value)
                  ? props.data
                  : Object.keys(props.data || {})
              )?.map(
                (res, i) => {

                  return <Option
                    key={
                      (
                        // check if the item is array or string to determine how to display the key name else return the key + i use i to make it always unique by adding the index number
                        (item && typeof item === 'object')
                          ? item.map(e => res?.[e])
                            .filter(e => e).join(' - ')
                          : res?.[item])
                      || res + i
                    }
                    // if if there's just a value and there's no item to use the object key as name and the required object property as a value
                    value={
                      `${res?.[value] || res}${(value && !item) ? '@@' + props.data?.[res]?.[0]?.[value] : ''}`

                    }>
                    {/* {console.log(props.data?.[res]?.[0]?.[value], value, '...........................')} */}
                    {
                      (
                        // just like the key but without index
                        (item && typeof item === 'object')
                          ? item.map(e => res?.[e])
                            .filter(e => e)
                            .join(' - ')
                          : res?.[item])
                      || res
                    }</Option>
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
