import React from "react";

const WithAuth = (Component) => {
  const Auth = (props) => {
    const temp = localStorage.getItem("token");

    if (temp) {
      localStorage.removeItem("token");
      sessionStorage.setItem("token", temp);
    }
    let token = sessionStorage.getItem("token");

    if (!token) {
      return (window.location = "/admin/signup");
    } else {
      return <Component {...props} />;
    }
  };
  return Auth;
};

export default WithAuth;
