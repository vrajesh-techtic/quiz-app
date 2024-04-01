import React, { useContext, useEffect, useState } from "react";

import OTPInput from "./OTPInput";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";
import ContextAPI from "./participants/ContextAPI";

const OTPPage = () => {
  console.log("OTP Page");

  const [spinning, setSpinning] = useState(false);
  const { isUserAuth, setisUserAuth } = useContext(ContextAPI);

  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      navigate("/authenticate/display-quiz");
    }, 2000);
  };

  const navigate = useNavigate();

  let userEmail = Object.keys(sessionStorage)[0];

  async function verifyOTP(enteredOTP) {
    try {
      let verificationAPI = await axios.post(
        "http://localhost:5000/verify-otp",
        {
          otp: parseInt(enteredOTP),
          userEmail,
        }
      );

      if (verificationAPI.data.statusCode === 500) {
        return {
          status: false,
          message: verificationAPI.data.message,
        };
      } else if (verificationAPI.data.statusCode === 200) {
        setisUserAuth(() => true);

        return {
          status: true,
          message: verificationAPI.data.message,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex w-full h-screen form-container items-center justify-center ">
        <div className=" backdrop-blur-xl hover:shadow-xl	rounded-2xl flex flex-col items-center px-20 py-12">
          <p className="mb-8 mt-2 text-5xl">OTP Authentication</p>

          <OTPInput onOtpSubmit={verifyOTP} showLoader={showLoader} />
        </div>
        <Spin spinning={spinning} size="large" tip="Loading ..." fullscreen />
      </div>
    </>
  );
};

export default OTPPage;
