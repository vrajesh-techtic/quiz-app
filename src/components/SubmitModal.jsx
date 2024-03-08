import { Modal, Spin } from "antd";
import React, { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import questionBank from "../questions/questionBank";

const SubmitModal = ({ modalOpen, setModalOpen, okFunc }) => {
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  const answerObj = questionBank.map((i) => i.selected);

  return (
    <>
      <Modal
        title="Do you want to submit the Quiz?"
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
            navigate("/result");
          }, 1000);
          console.log(JSON.stringify(answerObj));
          localStorage.setItem("bank", JSON.stringify(answerObj));
        }}
        okButtonProps={{
          style: { backgroundColor: "#f87171", color: "white" },
        }}
        onCancel={() => setModalOpen(false)}
        afterClose={() => setModalOpen(false)}
      />
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

export default SubmitModal;
