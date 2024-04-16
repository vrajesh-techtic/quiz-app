import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Spin, notification } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BiRename } from "react-icons/bi";
// import { Formik, Field, ErrorMessage } from "formik";

import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";

const VerifiedAdminLogin = () => {
  const navigate = useNavigate();

  const onFinish = async (data) => {
    const email = JSON.parse(localStorage.getItem("adminEmail")).email;
    console.log("data", data);

    const api = await axios
      .post("http://localhost:5000/add-admin", { ...data, email })
      .then((res) => res.data);

    console.log("api", api);

    // localStorage.setItem("adminEmail", JSON.stringify(obj));

    // navigate("/admin/dashboard");
  };

  const onFinishFailed = () => {
    console.log("Finish failed!");
  };

  return (
    <>
      <Form
        name="normal_login"
        className="login-form flex flex-col mx-8  items-center"
        size="large"
        initialValues={{
          email: "",
        }}
        onFinish={(data) => onFinish(data)}
        onFinishFailed={onFinishFailed}
      >
        {/* Admin Full Name  */}
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
            placeholder="Admin name"
          />
        </Form.Item>
        {/* Admin Username  */}
        <Form.Item
          name="username"
          className="w-[400px]"
          rules={[
            {
              type: "string",
              required: true,
              message: "Username is required !",
            },
          ]}
        >
          <Input prefix={<BiRename />} name="username" placeholder="Username" />
        </Form.Item>

        {/* Password  */}
        <Form.Item
          className="w-[400px]"
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

        {/* Confirm Password  */}
        <Form.Item
          className="w-[400px]"
          name="confirmPassword"
          rules={[
            {
              type: "string",
              required: true,
              message: "Please enter confirm password !",
            },
          ]}
        >
          <Input.Password
            prefix={<RiLockPasswordLine />}
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item className="flex flex-col">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-[200px] text-lg flex justify-center items-center bg-blue-500"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default VerifiedAdminLogin;