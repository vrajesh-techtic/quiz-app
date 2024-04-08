import React, { useState } from "react";
import { Button, Form, Input, Spin, notification } from "antd";
import {
  MailOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import main from '../server/mailer';

const UserLogin = () => {
  const [api, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState(false);

  const openNotificationWithIcon = (type, notifyMessage) => {
    api[type]({
      // message: "User already exists!",
      message: notifyMessage,
    });
  };

  const onFinish = async (values) => {
    const userEmail = values.email;
    const userName = values.name;
    const quizCode = values.quizCode.toUpperCase();

    const userDetails = {
      email: userEmail,
      name: userName,
      quizCode: quizCode,
    };

    console.log("User details :::: ", userDetails);
    setSpinning(true);

    openNotificationWithIcon("success", "Successfully Logged In!");
    // Trial
    setTimeout(() => {
      setSpinning(false);
      localStorage.setItem("login", true);
      navigate("/participant/display-quiz");
    }, 1000);

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
    //       navigate("/authenticate");
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
      <div className="flex w-full h-screen bg-blue-300 items-center justify-center ">
        <div className=" backdrop-blur-xl hover:shadow-xl bg-green-300	rounded-2xl flex flex-col items-center px-20 py-12">
          <p className="mb-8 mt-2 text-5xl">Participant Login</p>

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

            <Form.Item
              name="quizCode"
              className="w-[400px]"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "Quiz Code is required !",
                },
              ]}
            >
              <Input
                prefix={
                  <QuestionCircleOutlined className="site-form-item-icon" />
                }
                name="quizCode"
                placeholder="Quiz Code"
              />
            </Form.Item>

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

            <Form.Item className="flex flex-col">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button w-[200px] text-lg flex justify-center items-center bg-blue-500"
              >
                Start Quiz
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Spin spinning={spinning} size="large" tip="Loading ..." fullscreen />
      </div>
    </>
  );
};

export default UserLogin;
