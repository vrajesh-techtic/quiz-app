import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Spin, notification } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BiRename } from "react-icons/bi";
// import { Formik, Field, ErrorMessage } from "formik";

import { RiLockPasswordLine } from "react-icons/ri";
import logo from "../assets/banner-without-bg.png";
import VerifiedAdminLogin from "../components/admin/VerifiedAdminLogin";
import NotVerifiedAdmin from "../components/admin/NotVerifiedAdmin";
import WithAuth from "../auth/WithAuth";
import WithoutAuth from "../auth/WithoutAuth";
import axios from "axios";

// import main from '../server/mailer';

const AdminSignUp = () => {
  const [api, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const openNotificationWithIcon = (type, notifyMessage) => {
    api[type]({
      // message: "User already exists!",
      message: notifyMessage,
    });
  };

  const email = JSON.parse(localStorage.getItem("adminEmail"))?.email;

  useEffect(() => {
    async function fetchAPI() {
      const isUserVerified = await axios
        .post("http://localhost:5000/verify-user", {
          email,
        })
        .then((res) => res.data);

      if (isUserVerified.status) {
        setIsVerified(true);
      }
    }

    fetchAPI();
  }, []);

  // const showLoader = () => {
  //   setSpinning(true);
  //   setTimeout(() => {
  //     setSpinning(false);
  //     navigate("/authenticate/display-quiz");
  //   }, 2000);
  // };

  const navigate = useNavigate();

  return (
    <>
      {contextHolder}
      <div className="flex flex-col w-full h-screen bg-gray-800 items-center ">
        <div className="  w-[300px]">
          <img src={logo} style={{ width: "100%" }} alt="" />
        </div>
        <div className=" backdrop-blur-xl hover:shadow-xl bg-[#04c1cc]	rounded-2xl flex flex-col items-center px-20 py-8">
          <p className="mb-8 mt-2 text-3xl">Admin Signup</p>

          {isVerified ? (
            <VerifiedAdminLogin />
          ) : (
            <NotVerifiedAdmin
              setSpinning={setSpinning}
              setIsVerified={setIsVerified}
            />
          )}

          {/* <Form.Item name="remember">
              <Checkbox
                className="text-xl"
                defaultChecked={remember}
                onChange={() => {
                  setRemember((prev) => !prev);
                }}
              >
                Remember me
              </Checkbox>
            </Form.Item> */}
        </div>
        <Spin spinning={spinning} size="large" tip="Loading ..." fullscreen />
      </div>
    </>
  );
};

export default WithoutAuth(AdminSignUp);
