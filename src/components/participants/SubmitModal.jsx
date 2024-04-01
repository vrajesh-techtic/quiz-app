import { Modal, Spin } from "antd";
import React, { useContext, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import questionBank from "../../questions/questionBank";
import ContextAPI from "./ContextAPI";

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

const SubmitModal = ({ modalOpen, setModalOpen }) => {
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();
  const [userAns, questionBank] = useContext(ContextAPI);

  const details = calculateAttempted(userAns);

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
            localStorage.setItem("userAns", JSON.stringify(userAns));
            navigate("/result");
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
        <div className="flex my-5">
          <div className="flex flex-col bg-blue-300 w-[120px] rounded-lg  mx-3 p-2 items-center">
            <span>Total Questions</span>
            <span className="font-medium text-2xl">{details.total}</span>
          </div>
          <div className="flex flex-col bg-green-300 w-[120px] rounded-lg  mx-3 p-2 items-center">
            <span>Attempted</span>
            <span className="font-medium text-2xl">{details.attempted}</span>
          </div>
          <div className="flex flex-col bg-red-300 w-[120px] rounded-lg  mx-3 p-2 items-center">
            <span>Not Attempted</span>
            <span className="font-medium text-2xl">{details.unAttempted}</span>
          </div>
        </div>
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

export default SubmitModal;
