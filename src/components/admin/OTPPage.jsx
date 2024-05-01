import React, { useState } from "react";
import logo from "../../assets/banner-without-bg.png";

import OTPInput from "./OTPInput";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";

import WithoutAuth from "../../auth/WithoutAuth";

const OTPPage = () => {
  console.log("OTP Page");
  const obj = JSON.parse(localStorage.getItem("adminEmail"));
  let email = obj?.email || "";
  const navigate = useNavigate();

  const [spinning, setSpinning] = useState(false);

  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      navigate("/admin/signup");
    }, 2000);
  };

  async function verifyOTP(enteredOTP) {
    try {
      const verificationAPI = await axios
        .post("http://localhost:5000/verify-otp", {
          otp: parseInt(enteredOTP),
          email,
        })
        .then((res) => res);

      console.log("verificationAPI", verificationAPI.data);
      if (verificationAPI.data.status) {
      }

      return verificationAPI.data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col w-full bg-black h-screen form-container items-center  ">
        <div className="auth-logo w-[300px]">
          <img src={logo} style={{ width: "100%" }} alt="" />
        </div>
        <div className="otp-container backdrop-blur-xl bg-[#ca89fd] hover:shadow-xl	rounded-2xl flex flex-col items-center px-20 py-12">
          <p className="otp-title mb-8 mt-2 text-5xl">OTP Authentication</p>

          <OTPInput onOtpSubmit={verifyOTP} showLoader={showLoader} />
        </div>
        <Spin spinning={spinning} size="large" tip="Loading ..." fullscreen />
      </div>
    </>
  );
};

export default WithoutAuth(OTPPage);
