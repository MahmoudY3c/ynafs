import React from 'react';
import { Input, Modal, Spin } from 'antd';
// console.log(Input)
const LoadingModal = ({ state }) => {
  return (
    <>
      <Modal
        title="جارى حفظ السؤال برجاءء الانتظار...."
        open={state}
        style={{ textAlign: "rtl" }}
        closable={false}
        confirmLoading={true}
        cancelText="..."
      >
        <Spin style={{ margin: "auto" }} />
      </Modal>
    </>
  );
};

export default LoadingModal;