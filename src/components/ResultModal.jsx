import { Modal, Spin } from "antd";
import React, { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import questionBank from "../questions/questionBank";

const ResultModal = ({ modalOpen, setModalOpen, userAns, correctAns }) => {
  function countPoints(userAns, correctAns, n) {
    let marks = 0;

    for (let i = 1; i < n; i++) {
      if (correctAns.at(i) === userAns.at(i)) marks++;
    }
    console.log("userAns", userAns);
    console.log("correctAns: ", correctAns);
    return marks;
  }

  const marksObtained = countPoints(userAns, correctAns, correctAns.length);

  console.log("marksObtained", marksObtained);

  let count = 0;
  for (let i = 1; i < userAns.length; i++) {
    if (userAns[i] !== null) count++;
  }

  return (
    <>
      <Modal
        className="text-center"
        icon={<ExclamationCircleFilled />}
        zIndex={1}
        closeIcon={true}
        okText="Send Email"
        okType="danger"
        maskClosable={true}
        closable={true}
        open={modalOpen}
        onOk={() => {}}
        styles={{ content: { backgroundColor: "#edfcfc" } }}
        okButtonProps={{
          style: { backgroundColor: "#f87171", color: "white" },
        }}
        cancelButtonProps={{
          style: { display: "none" },
        }}
        onCancel={() => setModalOpen(false)}
        afterClose={() => setModalOpen(false)}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Your Result!</h1>
          <div className="flex flex-col items-start text-xl my-5">
            <span>
              <strong>Total Questions:</strong> {questionBank.length - 1}
            </span>
            <span className="text-blue-500">
              <strong>Attempted:</strong> {count}
            </span>
            <span className="text-green-500">
              <strong>Correct:</strong> {marksObtained}
            </span>
            <span className="text-red-500">
              <strong>Incorrect:</strong>{" "}
              {questionBank.length - marksObtained - 1}
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResultModal;
