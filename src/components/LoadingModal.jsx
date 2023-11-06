import React from 'react';
import { Modal, Spin } from 'antd';
// console.log(Input)
const LoadingModal = ({ state, title }) => {
  return (
    <>
      <Modal
        title={title || "جارى حفظ السؤال برجاءء الانتظار...."}
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