import React, { useState } from "react";
import { Button, Form, Input, Spin, notification } from "antd";
import {
  MailOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ParticipantWithoutAuth from "../auth/ParticipantWithoutAuth";
// import axios from "axios";
import logo from "../assets/banner-without-bg.png";
import useToast from "../components/NotificationPopup";
import axios from "axios";

const UserLogin = () => {
  const [spinning, setSpinning] = useState(false);
  const { contextHolder, showToast } = useToast();

  const onFinish = async (values) => {
    const email = values.email;
    const name = values.name;
    const quizCode = values.quizCode.toUpperCase();

    if (email.trim() === "") {
      showToast("error", "Please enter email address!");
    } else if (name.trim() === "") {
      showToast("error", "Please enter name!");
    } else if (quizCode.trim() === "" || quizCode.length < 6) {
      showToast("error", "Please enter valid quiz code!");
    } else {
      const url = `/quiz/${quizCode}`;
      const resultURL = `/participant/result/${quizCode}`;
      const userDetails = {
        email,
        name,
        quizCode,
      };
      console.log("User details :::: ", userDetails);

      const api = await axios
        .post("http://localhost:5000/add-user", userDetails)
        .then((res) => res.data);

      if (api.isAttempted === false) {
        showToast("success", api.message);
        setSpinning(true);
        setTimeout(() => {
          setSpinning(false);
          sessionStorage.setItem(
            "participant",
            JSON.stringify({ email: email, name: name })
          );
          sessionStorage.setItem("token", api.token);
          navigate(url);
        }, 1000);
      } else {
        // showToast("error", api.message);
        setSpinning(true);
        setTimeout(() => {
          setSpinning(false);
          //  sessionStorage.setItem(
          //    "participant",
          //    JSON.stringify({ email: email, name: name })
          //  );
          sessionStorage.setItem("token", api.token);
          navigate(resultURL);
        }, 1000);
      }
    }

    // Trial

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
        <div className=" backdrop-blur-xl hover:shadow-xl bg-[#ca89fd]	rounded-2xl flex flex-col items-center px-20 py-12">
          <p className="mb-8 mt-2 text-5xl">Participant Login</p>

          <Form
            name="normal_login"
            className="login-form flex flex-col mx-8  items-center"
            size="large"
            initialValues={{
              name: "",
              email: "",
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

export default ParticipantWithoutAuth(UserLogin);
