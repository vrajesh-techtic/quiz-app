import { Spin, Statistic } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContextAPI from "./ContextAPI";

const QuizTimer = () => {
  const { Countdown } = Statistic;
  const navigate = useNavigate();
  const [isQuiz, setIsQuiz] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const [userAns, questionBank] = useContext(ContextAPI);

  // const [modalOpen, setModalOpen] = useState(false);

  // Change timer function
  const onChange = (val) => {
    // if (typeof val === "number" && 4.95 * 1000 < val && val < 5 * 1000) {
    //   console.log("changed!");
    // }
  };

  function onFinish() {
    // setSpinning(() => true);
    // setTimeout(() => {
    //   setSpinning(() => false);
    //   localStorage.setItem("userAns", JSON.stringify(userAns));
    //   navigate("/result");
    // }, 1000);
  }

  return (
    <>
      {/* {isQuiz ? null : <SubmitModal modalOpen={true} setModalOpen={() => {}} />} */}
      <Countdown
        valueStyle={{ fontSize: "2rem", color: "#c989fe" }}
        value={isQuiz ? Date.now() + 100 * 1000 : null}
        onChange={onChange}
        onFinish={onFinish}
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

export default QuizTimer;
