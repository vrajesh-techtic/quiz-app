import React from "react";

import MainNavBar from "../components/MainNavBar";
import HomeBanner from "../components/HomeBanner";

function ResponsiveAppBar() {
  return (
    <>
      <div className="h-screen">
        <MainNavBar />
        <HomeBanner />

        <div className="home-footer bg-gray-100 py-5 flex items-center justify-center font-medium ">
          Quizify ©{new Date().getFullYear()} Created by
          <span className="mx-1 underline text-[#ca89fd]">
            <a href="/" target="_blank">
              Anuj
            </a>
          </span>
          &
          <span className="mx-1 underline text-[#04c1cc]">
            <a href="/" target="_blank">
              Vrajesh
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
export default ResponsiveAppBar;
