import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Spin, notification } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BiRename } from "react-icons/bi";
// import { Formik, Field, ErrorMessage } from "formik";

import { RiLockPasswordLine } from "react-icons/ri";
import logo from "../assets/banner-without-bg.png";
import VerifiedAdminLogin from "../components/admin/VerifiedAdminLogin";
import NotVerifiedAdmin from "../components/admin/NotVerifiedAdmin";
import WithAuth from "../auth/WithAuth";
import WithoutAuth from "../auth/WithoutAuth";
import axios from "axios";

// import main from '../server/mailer';

const AdminSignUp = () => {
  const [spinning, setSpinning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const email = JSON.parse(localStorage.getItem("adminEmail"))?.email;

  useEffect(() => {
    async function fetchAPI() {
      const isUserVerified = await axios
        .post("http://localhost:5000/verify-user", {
          email,
        })
        .then((res) => res.data);

      if (isUserVerified.status) {
        setIsVerified(true);
      }
    }

    fetchAPI();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col w-full h-screen bg-gray-800 items-center ">
        <div className=" auth-logo w-[300px]">
          <img src={logo} style={{ width: "100%" }} alt="" />
        </div>
        <div className="auth-form-container backdrop-blur-xl hover:shadow-xl bg-[#04c1cc]	rounded-2xl flex flex-col items-center ">
          <p className="form-title mb-8 mt-2 ">Admin Signup</p>

          {isVerified ? (
            <VerifiedAdminLogin setSpinning={setSpinning} />
          ) : (
            <NotVerifiedAdmin
              setSpinning={setSpinning}
              setIsVerified={setIsVerified}
            />
          )}

          <button
            onClick={() => navigate("/admin/login")}
            className="text-blue-800 text-lg mt-8  underline "
          >
            Already a user? Login
          </button>
        </div>
        <Spin spinning={spinning} size="large" tip="Loading ..." fullscreen />
      </div>
    </>
  );
};

export default WithoutAuth(AdminSignUp);
