import { Modal, Spin } from "antd";
import React, { useContext, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ContextAPI from "./ContextAPI";
import ParticipantWithAuth from "../../auth/ParticipantWithAuth";

function calculateAttempted(userAns) {
  let totalQues = Object.entries(userAns).length - 1;
  let attempted = 0;

  for (let i = 1; i < totalQues + 1; i++) {
    if (userAns[i] !== null) attempted++;
  }

  return {
    total: totalQues,
    attempted: attempted,
    unAttempted: totalQues - attempted,
  };
}

const SubmitModal = ({ modalOpen, setModalOpen, code }) => {
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  const resultUrl = `/participant/result/${code}`;

  return (
    <>
      <Modal
        icon={<ExclamationCircleFilled />}
        zIndex={1}
        closeIcon={true}
        okText="Submit"
        okType="danger"
        maskClosable={true}
        closable={true}
        open={modalOpen}
        onOk={() => {
          setSpinning(() => true);

          setTimeout(() => {
            setSpinning(() => false);
            navigate(resultUrl);
          }, 1000);
        }}
        okButtonProps={{
          style: { backgroundColor: "#f87171", color: "white" },
        }}
        onCancel={() => setModalOpen(false)}
        afterClose={() => setModalOpen(false)}
      >
        <span className="font-medium text-2xl mt-5 text-center">
          Do you really want to submit the Quiz?
        </span>
      </Modal>
      <Spin
        spinning={spinning}
        style={{ zIndex: "2" }}
        size="large"
        tip="Loading ..."
        fullscreen
      />
    </>
  );
};

export default ParticipantWithAuth(SubmitModal);
