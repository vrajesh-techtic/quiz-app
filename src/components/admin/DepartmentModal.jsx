import { Modal } from "antd";
import React, { useState } from "react";

const DepartmentModal = ({ modalOpen, setModalOpen }) => {
  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
};

export default DepartmentModal;
