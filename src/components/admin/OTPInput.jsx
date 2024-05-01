// OtpInput.jsx

import { useEffect, useRef, useState } from "react";
import useToast from "../NotificationPopup";

const OTPInput = ({ length = 4, onOtpSubmit, showLoader }) => {
  console.log("OTP Input");
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRefs = useRef([]);

  const [displayMsg, setDisplayMsg] = useState(true);

  const [isVerified, setisVerified] = useState({ status: false, message: "" });

  const { contextHolder, showToast } = useToast();

  let combinedOtp = "";

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = async (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      const apiData = await onOtpSubmit(combinedOtp);

      if (apiData.status) {
        showToast("success", "OTP Verified Successfully!");

        showLoader();
      } else {
        showToast("error", "Invalid OTP!");
      }

      setisVerified(() => apiData);
    }

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    setDisplayMsg(() => false);
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      {contextHolder}
      <div>
        {otp.map((value, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otpInput h-16 w-16 text-2xl text-center  mx-4"
            />
          );
        })}
      </div>

      <div className=" bg-white otp-msg-container  py-2 rounded-lg w-[500px] h-[70px] flex items-center justify-center text-red-400  mt-8 text-xl ">
        <span className="text-center">
          Please Check your e-mail address. You have might received an OTP for
          Verification.
        </span>
      </div>
    </>
  );
};
export default OTPInput;
