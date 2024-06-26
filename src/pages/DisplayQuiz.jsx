import React, { useContext, useState } from "react";
import Question from "../components/participants/Question";
import { Layout, Menu, Spin, theme } from "antd";
import logo from "../assets/banner-without-bg.png";
import SubmitModal from "../components/participants/SubmitModal";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import ContextAPI from "../components/participants/ContextAPI";
import ParticipantWithAuth from "../auth/ParticipantWithAuth";

const DisplayQuiz = ({ timer, quesList, quizCode, spinning }) => {
  console.log("Display Quiz");
  const [userAns, questionBank] = useContext(ContextAPI);

  const [modalOpen, setModalOpen] = useState(false);
  const [quesNum, setQuesNum] = useState(1);

  const userData = JSON.parse(sessionStorage.getItem("participant")) || {
    name: "Test",
    email: "test@example.com",
  };

  const [ansArr, setansArr] = useState(userAns);
  const [selectedAns, setSelectedAns] = useState();

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

  const items = quesList.map((i, idx) => {
    if (idx !== quesList.length) {
      return getItem(`Question ${idx + 1}`, idx + 1);
    }
  });

  return (
    <>
      {modalOpen ? (
        <SubmitModal
          modalOpen={modalOpen}
          code={quizCode}
          setModalOpen={setModalOpen}
        />
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
            onClick={(e) => {
              setQuesNum(() => parseInt(e.key));
            }}
            selectedKeys={`${quesNum}`}
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
            <Question
              userAns={ansArr}
              setansArr={setansArr}
              selectedAns={selectedAns}
              setSelectedAns={setSelectedAns}
              quesNo={quesNum}
              quesList={quesList}
              quizCode={quizCode}
            />

            <div className="control-btn flex items-center justify-end mt-2 h-[10%]">
              <button
                className="bg-blue-600 text-white hover:bg-violet-400  h-fit py-2 mx-2 w-[90px] rounded-lg flex justify-center items-center text-lg"
                onClick={() => {
                  setQuesNum((prev) => {
                    let num = 0;
                    if (prev === 1) {
                      num = quesList.length;
                    } else {
                      num = prev - 1;
                    }
                    return num;
                  });
                }}
              >
                Previous
              </button>
              <button
                className="bg-blue-600 text-white hover:bg-violet-400  h-fit py-2 mx-2 w-[90px] rounded-lg flex justify-center items-center text-lg"
                onClick={() => {
                  setQuesNum((prev) => {
                    let num = 0;
                    if (prev === quesList.length) {
                      num = 1;
                    } else {
                      num = prev + 1;
                    }
                    return num;
                  });
                }}
              >
                Next
              </button>
            </div>
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
export default ParticipantWithAuth(DisplayQuiz);
