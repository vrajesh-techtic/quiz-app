import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { Layout, Menu, theme } from "antd";
import logo from "../../assets/banner-without-bg.png";

import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  BookOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const AdminSideBar = ({ children, selectedKeys = 1 }) => {
  const navigate = useNavigate();

  // const userData = JSON.parse(localStorage.getItem("user"));
  const userData = { name: "Admin", email: "admin@gmail.com" };

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

  const items = [
    getItem("Dashboard", 1, <HomeOutlined />),
    getItem("My Library", 2, <BookOutlined />),
    getItem("Profile", 2, <UserOutlined />),
    // getItem("Settings", 4, <SettingOutlined />),
  ];

  const navRoutes = [
    "/admin/dashboard",
    // "/admin/library",
    "/admin/profile",
    // "/admin/settings",
  ];

  const menuSelect = ["", "1", "2"];

  const [currItem, setcurrItem] = useState(1);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider>
          <div className="demo-logo-vertical h-[100px] flex justify-center">
            <img src={logo} alt="quizify-logo" className="h-full  z-10" />
          </div>

          <button
            style={{
              // backgroundImage:
              //   "linear-gradient(to bottom right,#ca89fd, #04c1cc)",
              boxShadow: "4px 4px 0px #04c1cc",
            }}
            className="flex justify-center p-3 text-xl bg-[#ca89fd] text-white font-medium  mb-12 mt-4 mx-auto rounded-xl"
          >
            Create Quiz
          </button>

          <Menu
            theme="dark"
            onClick={(e) => {
              console.log("e", e.key);
              setcurrItem(() => {
                parseInt(e.key);
              });
              navigate(navRoutes[parseInt(e.key) - 1]);
            }}
            selectedKeys={menuSelect[selectedKeys]}
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
          ></Header>

          {/* Dynamic Content  */}
          <Content
            style={{
              margin: "16px",
              //   padding: 24,
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
              fontSize: "1rem",
            }}
          >
            Quizify ©{new Date().getFullYear()} Created by
            <span className="mx-1 underline text-[#ca89fd]">
              <a href="/" target="_blank">
                Anuj
              </a>
            </span>
            &
            <span className="mx-1 underline text-[#04c1cc]">
              <a href="/" target="_blank">
                Vrajesh
              </a>
            </span>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminSideBar;
