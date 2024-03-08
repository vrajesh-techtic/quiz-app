import React, { useContext, useEffect, useState } from "react";
import { Menu } from "antd";
import CustomSideBar from "./CustomSideBar";
import Question from "./Question";
import axios from "axios";
import ContextAPI from "./ContextAPI";
import questionBank from "../questions/questionBank";

const DisplayQuiz = ({ timer }) => {
  //   console.log("Display Quiz");
  // const { questionObj, setQuestionObj } = useContext(ContextAPI);
  const [quesNum, setQuesNum] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  // useEffect(() => {
  //   try {
  //     const addQues = axios.post("http://localhost:5000/addQuestionBank", {
  //       questionBank,
  //     });
  //     console.log(addQues);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [questionObj]);

  localStorage.removeItem("bank");

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Question 1", "1"),
    getItem("Question 2", "2"),
    getItem("Question 3", "3"),
    getItem("Question 4", "4"),
    getItem("Question 5", "5"),
  ];

  const menu = (
    <Menu
      theme="dark"
      onClick={(e) => setQuesNum(e.key)}
      defaultSelectedKeys={["1"]}
      mode="vertical"
      items={items}
    />
  );

  const submitBtn = (
    <button
      className="bg-red-400 h-[40px] flex items-center text-lg text-white  rounded-lg px-2 "
      onClick={() => {
        setModalOpen((prev) => !prev);
      }}
    >
      Submit Quiz
    </button>
  );

  return (
    <>
      <CustomSideBar
        menu={menu}
        timer={timer}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        submitBtn={submitBtn}
      >
        <Question quesNo={quesNum} btnDisable={false} />
      </CustomSideBar>
    </>
  );
};
export default DisplayQuiz;
