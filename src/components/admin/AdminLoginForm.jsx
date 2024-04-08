import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Spin, notification } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import main from '../server/mailer';

const AdminLogin = () => {
  const [api, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState(false);

  const openNotificationWithIcon = (type, notifyMessage) => {
    api[type]({
      // message: "User already exists!",
      message: notifyMessage,
    });
  };

  const [remember, setRemember] = useState(sessionStorage.length !== 0);

  const onFinish = async (values) => {
    const userEmail = values.email;
    const userName = values.name;

    if (remember) {
      sessionStorage.clear();
      sessionStorage.setItem(userEmail, userName);
    }

    setSpinning(true);
    openNotificationWithIcon("success", "Successfully Logged In!");

    setTimeout(() => {
      setSpinning(false);
      localStorage.setItem("admin", true);
      navigate("/admin/dashboard");
    }, 2000);

    // try {
    //   let addUser = await axios.post("http://localhost:5000/add-user", {
    //     userName,
    //     userEmail,
    //   });

    //   console.log(addUser.data);
    //   if (addUser.data.statusCode === 200) {
    //     setSpinning(true);
    //     setTimeout(() => {
    //       setSpinning(false);
    //       localStorage.setItem("admin", true);
    //       navigate("/admin/authenticate");
    //     }, 2000);
    //   } else if (addUser.data.statusCode === 11000) {
    //     openNotificationWithIcon("error", addUser.data.message);
    //   }

    //   setSpinning(() => false);
    // } catch (error) {
    //   setSpinning(() => false);

    //   if (error.message === "Network Error")
    //     openNotificationWithIcon("error", "Server Down!");
    // }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let savedName = "";
  let savedEmail = "";

  if (sessionStorage.length !== 0) {
    savedEmail = sessionStorage.key(0);
    savedName = sessionStorage.getItem(savedEmail);
  }

  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      navigate("/authenticate/display-quiz");
    }, 2000);
  };

  const navigate = useNavigate();

  return (
    <>
      {contextHolder}
      <div className="flex w-full h-screen bg-yellow-200 items-center justify-center ">
        <div className=" backdrop-blur-xl hover:shadow-xl bg-pink-200	rounded-2xl flex flex-col items-center px-20 py-12">
          <p className="mb-8 mt-2 text-5xl">Admin Login</p>

          <Form
            name="normal_login"
            className="login-form flex flex-col mx-8  items-center"
            size="large"
            initialValues={{
              name: savedName,
              email: savedEmail,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="name"
              className="w-[400px]"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "Name is required !",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                name="name"
                placeholder="Participant name"
              />
            </Form.Item>
            <Form.Item
              className="w-[400px]"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please enter correct email !",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                name="email"
                placeholder="Email address"
              />
            </Form.Item>

            <Form.Item name="remember">
              <Checkbox
                className="text-xl"
                defaultChecked={remember}
                onChange={() => {
                  setRemember((prev) => !prev);
                }}
              >
                Remember me
              </Checkbox>
            </Form.Item>

            <Form.Item className="flex flex-col">
              <Button
                type="primary"
                onClick={() => setSpinning(() => true)}
                htmlType="submit"
                className="login-form-button w-[200px] text-lg flex justify-center items-center bg-blue-500"
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Spin spinning={spinning} size="large" tip="Loading ..." fullscreen />
      </div>
    </>
  );
};

export default AdminLogin;
