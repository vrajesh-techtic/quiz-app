import React from "react";

const Footer = () => {
  return (
    <div className=" text-white text-base flex items-center justify-center bg-[#001529] h-[9%]">
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
  );
};

export default Footer;
