import React, { useContext, useState } from "react";
import questionBank from "../questions/questionBank";
import { Menu } from "antd";
import CustomSideBar from "./CustomSideBar";
import Question from "./Question";
import { useNavigate } from "react-router-dom";
import ResultModal from "./ResultModal";
import ContextAPI from "./ContextAPI";

const ResultPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { setisUserAuth } = useContext(ContextAPI);
  const userAns = JSON.parse(localStorage.getItem("bank"));
  const correctAns = questionBank.map((i) => i.answer);

  const [quesNum, setQuesNum] = useState(1);

  // console.log(questionBank);
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

  const resultDisplay = (
    <button
      className="bg-blue-400 h-[40px] flex items-center text-white text-xl  rounded-lg px-2 "
      onClick={() => setModalOpen(true)}
    >
      Show Result
    </button>
  );

  const exitBtn = (
    <button
      className="bg-red-400 h-[40px] flex items-center text-lg text-white  rounded-lg px-2 "
      onClick={() => {
        setisUserAuth(false);
        navigate("/");
      }}
    >
      Leave Quiz
    </button>
  );

  return (
    <>
      {modalOpen ? (
        <ResultModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          userAns={userAns}
          correctAns={correctAns}
        />
      ) : null}
      <CustomSideBar
        menu={menu}
        timer={resultDisplay}
        modalOpen={null}
        setModalOpen={null}
        submitBtn={exitBtn}
      >
        <Question
          quesNo={quesNum}
          userAns={userAns}
          correctAns={correctAns}
          btnDisable={true}
        />
      </CustomSideBar>
    </>
  );
};

export default ResultPage;
