import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Layout, Menu, theme } from "antd";
import logo from "../../assets/banner-without-bg.png";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Box, MenuItem, Typography } from "@mui/material";
import AdminContextAPI from "./AdminContextAPI";

const AdminSideBar = ({ children, selectedKeys = 1 }) => {
  const navigate = useNavigate();
  const data = useContext(AdminContextAPI);

  const [anchorElUser, setAnchorElUser] = React.useState(false);

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
    getItem("Profile", 3, <UserOutlined />),
  ];

  const navRoutes = ["/admin/dashboard", "/admin/library", "/admin/profile"];

  const menuSelect = ["", "1", "2", "3"];

  const [currItem, setcurrItem] = useState(1);

  function logOut() {
    let res = window.confirm("Are you sure you want to logout?");
    if (res) {
      localStorage.removeItem("admin");
      navigate("/admin");
    }
  }

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        {/* Left side Sidebar  */}
        <Sider>
          <div className="demo-logo-vertical h-[100px] flex justify-center">
            <img src={logo} alt="quizify-logo" className="h-full  z-10" />
          </div>

          <button
            onClick={() => {
              navigate("/admin/create-quiz");
            }}
            style={{
              boxShadow: "4px 4px 0px #04c1cc",
            }}
            className="flex justify-center p-3 text-xl bg-[#ca89fd] text-white font-medium  mb-12 mt-4 mx-auto rounded-xl"
          >
            Create Quiz
          </button>

          <Menu
            theme="dark"
            onClick={(e) => {
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
          {/* Top Navbar  */}
          <Header
            className="flex justify-between items-center"
            style={{
              padding: 0,
              background: "#001529",
              color: "white",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <div className="flex w-[15%] me-12 items-center justify-between">
              <button
                onClick={() => {
                  navigate("/participant");
                }}
                className="flex bg-[#e7c6ff] font-medium text-lg text-[#ba60ff] h-[35px] p-3 rounded-md items-center"
              >
                Enter Code
              </button>
              <Box
                sx={{
                  flexGrow: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <button
                  onClick={() => setAnchorElUser((prev) => !prev)}
                  className="w-[45px]"
                >
                  <img
                    className="rounded-full border-2 border-white"
                    src={data["profile-image"]}
                    alt=""
                  />
                </button>

                <Menu
                  style={{
                    backgroundColor: "#F6F5F5",
                    position: "absolute",
                    top: "60px",
                    right: "45px",
                    display: anchorElUser ? "block" : "none",
                    borderRadius: "10px",
                    width: "150px",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setcurrItem(1);
                      navigate(navRoutes[parseInt(1) - 1]);
                    }}
                  >
                    <HomeOutlined />
                    <Typography marginLeft={1} textAlign="center">
                      Dashboard
                    </Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      setcurrItem(2);
                      navigate(navRoutes[parseInt(2) - 1]);
                    }}
                  >
                    <BookOutlined />
                    <Typography marginLeft={1} textAlign="center">
                      My Library
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setcurrItem(3);
                      navigate(navRoutes[parseInt(3) - 1]);
                    }}
                  >
                    <UserOutlined />
                    <Typography marginLeft={1} textAlign="center">
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={logOut}>
                    <LogoutOutlined />
                    <Typography marginLeft={1} textAlign="center">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          </Header>

          {/* Dynamic Content  */}
          <Content
            style={{
              margin: "16px",
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
