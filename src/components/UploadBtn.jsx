
import React from 'react';
import { Form, Upload, Button } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import request from '../API/api';
import { formData } from '../handlers/handlers';

function UploadBtn(props) {
  const uploadPath = props.path || '/images';

  const normFile = (e) => {
    console.log("Upload event:", e);
    return e.file
  };
  const uploader = async function (e) {
    await request(uploadPath, {
      method: "POST",
      body: formData({
        file: e.file,
        uid: e.file.uid,
      }),
      // cors: "no-cors",
    });
    // console.log(file.fileId); 
    e.onSuccess();
  }
  return (
    <div
      style={{
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      size="large"
    >

      <Form.Item
        name={props.name}
        getValueFromEvent={normFile}
        rules={[{
          required: props.required ? true : false,
          message: props.message || 'برجاء اختيار ملف'
        }]}
        valuePropName="files"
      >
        <Upload
          listType="picture"
          maxCount={1}
          onChange={props.onChange}
          customRequest={uploader}
          accept={props.accept || 'image/png, image/jpeg'}
        // fileList={[]}
        // onSuccess={() => form.setFieldsValue({})}
        >
          <Button style={{ margin: '10px' }} icon={<UploadOutlined />} >{props.title}</Button>
        </Upload>
      </Form.Item>
    </div>
  );
}

export default UploadBtn;