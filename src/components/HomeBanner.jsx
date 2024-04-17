import React from "react";
import { LoginOutlined, PlusCircleOutlined } from "@ant-design/icons";
import bannerImage from "../assets/quote-banner-img.png";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="home-banner ">
      <div className="left-quote-container  w-[760px] ">
        {/* Quote Container  */}
        <div className="banner flex flex-col p-5 w-full ">
          <span className="quote font-bold  ">
            Knowledge is power, quizzing is empowerment.
          </span>
          <span className="tagline  mt-8">Craft a Quiz within a snap.</span>
        </div>

        {/* Button Container  */}
        <div className="user-btn-container flex w-full ms-8 mt-8">
          <div>
            <button
              onClick={() => {
                const isLogin =
                  JSON.parse(localStorage.getItem("adminEmail"))?.verified ||
                  false;

                if (isLogin) navigate("/admin/dashboard");
                else navigate("/admin/signup");
              }}
              style={{ boxShadow: "4px 4px 0px 2px black" }}
              className=" user-btns bg-[#ca89fd]  text-xl text-white justify-center flex font-medium mx-6 px-4 py-3 rounded-md items-center"
            >
              <PlusCircleOutlined />
              <span className="ms-1">Create</span>
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                const isLogin =
                  JSON.parse(localStorage.getItem("participantEmail"))
                    ?.verified || false;

                if (isLogin) navigate("/participant/display-quiz");
                else navigate("/participant/login");
              }}
              style={{ boxShadow: "4px 4px 0px 2px black" }}
              className=" user-btns bg-[#04c1cc]  text-xl text-white justify-center flex font-medium mx-6 px-4 py-3 rounded-md items-center"
            >
              <LoginOutlined />
              <span className="ms-1">Join</span>
            </button>
          </div>
        </div>
      </div>

      <div className="right-gif-container  ">
        <img
          src={bannerImage}
          style={{ width: "100%", height: "100%" }}
          alt=""
        />
      </div>
    </div>
  );
};

export default HomeBanner;
