import React from "react";
import { LoginOutlined, PlusCircleOutlined } from "@ant-design/icons";
import bannerImage from "../assets/quote-banner-img.png";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <div className=" flex h-[77%] 300 items-center">
      <div className="left-quote-container">
        {/* Quote Container  */}
        <div className="banner flex flex-col p-5 w-fit ">
          <span className="text-6xl font-bold w-[760px]">
            Knowledge is power, quizzing is empowerment.
          </span>
          <span className="text-4xl mt-8">Craft a Quiz within a snap.</span>
        </div>

        {/* Button Container  */}
        <div className="flex  w-[760px] ms-8 mt-8">
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
              className=" bg-[#ca89fd] w-[150px] text-xl text-white justify-center flex font-medium mx-6 px-4 py-3 rounded-md items-center"
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
              className=" bg-[#04c1cc] w-[150px] text-xl text-white justify-center flex font-medium mx-6 px-4 py-3 rounded-md items-center"
            >
              <LoginOutlined />
              <span className="ms-1">Join</span>
            </button>
          </div>
        </div>
      </div>

      <div className="right-gif-container">
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
