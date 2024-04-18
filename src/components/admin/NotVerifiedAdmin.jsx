import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Spin, notification } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../store/adminReducers";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotVerifiedAdmin = ({ setSpinning, setIsVerified }) => {
  const prevData = useSelector((state) => state.adminReducers.adminData);
  const [adminData, setadminData] = useState(prevData || {});
  const dispatch = useDispatch();
  const { setAdminData } = adminActions;
  const navigate = useNavigate();

  useEffect(() => {
    setadminData(prevData);
  }, [prevData]);

  useEffect(() => {
    if (adminData.isVerified) {
    }
  }, [adminData]);

  const onFinish = async (data) => {
    console.log("onfinish");

    const api = await axios
      .post("http://localhost:5000/send-otp", {
        email: data.email,
      })
      .then((res) => res);

    console.log("api", api);

    const obj = { email: data.email, verified: false };

    localStorage.setItem("adminEmail", JSON.stringify(obj));

    dispatch(setAdminData(data));
    setSpinning(() => true);
    setTimeout(() => {
      setSpinning(false);
      localStorage.setItem("adminOTP", 1234);
      navigate("/admin/authenticate");
    }, 1000);
  };

  const onFinishFailed = () => {
    console.log("Finish Failed");
  };

  return (
    <>
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



        <Form.Item className="flex flex-col">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-[200px] text-lg flex justify-center items-center bg-blue-500"
          >
            Send OTP
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NotVerifiedAdmin;
