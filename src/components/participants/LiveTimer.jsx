import { Statistic } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const LiveTimer = ({ timer, quizCode, setSpinning }) => {
  const { Countdown } = Statistic;
  const navigate = useNavigate();

  function onFinish() {
    const resultUrl = `/participant/result/${quizCode}`;
    setSpinning(() => true);
    setTimeout(() => {
      setSpinning(() => false);
      navigate(resultUrl);
    }, 1000);
  }

  return (
    <>
      <Countdown
        valueStyle={{ fontSize: "2rem", color: "#c989fe" }}
        value={Date.now() + timer * 1000}
        onFinish={onFinish}
      />
    </>
  );
};

export default LiveTimer;
