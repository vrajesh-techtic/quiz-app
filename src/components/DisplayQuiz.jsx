import React, { useContext, useEffect, useState } from "react";

import Question from "./Question";
import questionBank from "../questions/questionBank";

import { Layout, Menu, theme } from "antd";
import logo from "../assets/banner-without-bg.png";
import SubmitModal, { showPromiseConfirm } from "./SubmitModal";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";

const DisplayQuiz = ({ timer }) => {
  console.log("Display Quiz");

  const [modalOpen, setModalOpen] = useState(false);
  const [quesNum, setQuesNum] = useState(1);
  const questionList = questionBank;
  const userData = JSON.parse(localStorage.getItem("user"));

  let ansArr = [];
  ansArr.push({ quesNo: 0, userAns: null });
  questionList.map((i, idx) => {
    return ansArr.push({
      quesNo: idx + 1,
      userAns: null,
    });
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = questionList.map((i, idx) => {
    if (idx !== questionList.length - 1) {
      return getItem(`Question ${idx + 1}`, idx + 1);
    }
  });

  return (
    <>
      <>
        {modalOpen ? (
          <SubmitModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        ) : null}
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider>
            <div className="demo-logo-vertical h-[100px] flex justify-center">
              <img src={logo} alt="quizify-logo" className="h-full  z-10" />
            </div>
            <Menu
              theme="dark"
              onClick={(e) => setQuesNum(e.key)}
              defaultSelectedKeys={["1"]}
              mode="vertical"
              items={items}
            />
          </Sider>

          {/* Right side layout  */}
          <Layout>
            <Header
              className="flex justify-between items-center"
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              {/* User details  */}
              <div className="ms-12">
                <span className="mx-8 text-xl">
                  <strong>Name:</strong> {userData.name}
                </span>
                <span className="mx-8 text-xl">
                  <strong>Email:</strong> {userData.email}
                </span>
              </div>

              {/* Timer and Submit Button  */}
              <div className="flex">
                {/* Quiz Timer  */}
                <div className="quiz-timer flex items-center">{timer}</div>

                {/* Submit Button  */}
                <div className="finish-quiz mx-8 flex items-center">
                  <button
                    className="bg-red-400 h-[40px] flex items-center text-lg text-white  rounded-lg px-2 "
                    onClick={() => {
                      setModalOpen((prev) => !prev);
                    }}
                  >
                    Submit Quiz
                  </button>
                </div>
              </div>
            </Header>

            {/* Dynamic Content  */}
            <Content
              style={{
                margin: "16px",
                padding: 24,
                height: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Question ansArr={ansArr} quesNo={quesNum} />
            </Content>

            <Footer
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Quizify ©{new Date().getFullYear()} Created by Quizify Pvt. Ltd.
            </Footer>
          </Layout>
        </Layout>
      </>
    </>
  );
};
export default DisplayQuiz;
