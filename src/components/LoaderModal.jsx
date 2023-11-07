import { Alert, Spin, Modal } from 'antd';
import React from 'react';

function LoaderModal({ message, type, show, openModal, title }) {
  return (
    <>
      <Alert
        message={message}
        type={type}
        style={{ ...styles.alert, display: show ? 'flex' : 'none' }}
        showIcon
        description=""
      />
      <Modal
        title={title || "جارى حفظ السؤال برجاءء الانتظار...."}
        open={openModal}
        style={{ textAlign: "rtl" }}
        closable={false}
        confirmLoading={true}
        cancelText="..."
      >
        <Spin style={{ margin: "auto" }} />
      </Modal>
    </>
  );
}

export default LoaderModal;

const styles = {
  alert: {
    position: 'fixed',
    top: 0,
    width: '100%',
    direction: "rtl",
    fontFamily: "'Cairo'",
    padding: "20px",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000
  }
};