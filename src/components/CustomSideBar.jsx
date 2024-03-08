import React, { useState } from "react";
import { Layout, theme } from "antd";
import logo from "../assets/banner-without-bg.png";
import SubmitModal, { showPromiseConfirm } from "./SubmitModal";

const { Header, Content, Footer, Sider } = Layout;

const CustomSideBar = ({
  menu,
  timer,
  modalOpen,
  setModalOpen,
  submitBtn,
  children,
}) => {
  //   console.log("Sidebar");

  const userData = JSON.parse(localStorage.getItem("user"));
  // const [modalOpen, setModalOpen] = useState(false);

  // background color
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
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
          {menu}
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
            <div className="ms-12">
              <span className="mx-8 text-xl">
                <strong>Name:</strong> {userData.name}
              </span>
              <span className="mx-8 text-xl">
                <strong>Email:</strong> {userData.email}
              </span>
            </div>

            <div className="flex">
              <div className="quiz-timer flex items-center">{timer}</div>

              <div className="finish-quiz mx-8 flex items-center">
                {submitBtn}
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
            {children}
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
  );
};
export default CustomSideBar;
