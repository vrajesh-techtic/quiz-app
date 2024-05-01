import React, { useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import logo from "../assets/banner-without-bg.png";
import WithoutAuth from "../auth/WithoutAuth";
import axios from "axios";
import useToast from "../components/NotificationPopup";

const AdminLogin = () => {
  const { contextHolder, showToast } = useToast();

  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (data) => {
    const api = await axios
      .post("http://localhost:5000/login-admin", data)
      .then((res) => res.data);

    if (api.status) {
      showToast("success", "Welcome back!");
      sessionStorage.setItem("token", api.token);

      setSpinning(true);
      setTimeout(() => {
        setSpinning(false);
        navigate("/admin/dashboard");
      }, 1000);
    } else {
      showToast("error", api.message);
    }
  };

  const onFinishFailed = () => {
    console.log("Finish Failed");
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col w-full h-screen bg-gray-800 items-center ">
        <div className=" auth-logo w-[300px]">
          <img src={logo} style={{ width: "100%" }} alt="" />
        </div>
        <div className="auth-form-container backdrop-blur-xl hover:shadow-xl bg-[#04c1cc]	rounded-2xl flex flex-col items-center ">
          <p className="form-title mb-8 mt-2 ">Admin Login</p>
          <Form
            name="normal_login"
            className="login-form flex flex-col mx-0  items-center"
            size="large"
            initialValues={{
              email: "",
            }}
            onFinish={(data) => onFinish(data)}
            onFinishFailed={onFinishFailed}
          >
            {/* Admin Email address  */}
            <Form.Item
              className="form-inputs w-[400px]"
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

            {/* Password  */}
            <Form.Item
              className="form-inputs w-[400px]"
              name="password"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "Please enter password !",
                },
              ]}
            >
              <Input.Password
                prefix={<RiLockPasswordLine />}
                name="password"
                placeholder="Enter Password"
              />
            </Form.Item>

            <Form.Item className="flex flex-col">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button w-[200px] text-lg flex justify-center items-center bg-blue-500"
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <button
            onClick={() => navigate("/admin/signup")}
            className="text-blue-800 text-lg mt-8  underline "
          >
            Not a user? Register
          </button>
        </div>
        <Spin spinning={spinning} size="large" tip="Loading ..." fullscreen />
      </div>
    </>
  );
};

export default WithoutAuth(AdminLogin);
