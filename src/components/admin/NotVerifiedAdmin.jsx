import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Spin, notification } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../store/adminReducers";

const NotVerifiedAdmin = ({ setSpinning }) => {
  const prevData = useSelector((state) => state.adminReducers.adminData);
  const [adminData, setadminData] = useState(prevData || {});
  const dispatch = useDispatch();
  const { setAdminData } = adminActions;

  useEffect(() => {
    setadminData(prevData);
  }, [prevData]);

  useEffect(() => {
    if (adminData.isVerified) {
    }
  }, [adminData]);

  const onFinish = (data) => {
    console.log("onfinish");

    dispatch(setAdminData(data));
    // setSpinning(() => true);
  };

  const onFinishFailed = () => {
    console.log("Finish Failed");
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
        {/* Admin Email address  */}
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
