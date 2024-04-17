import React from "react";

const WithAuth = (Component) => {
  const Auth = (props) => {
    // let login =
    //   JSON.parse(localStorage.getItem("adminEmail"))?.verified || false;

    let token = sessionStorage.getItem("token");

    if (!token) {
      return (window.location = "/admin/signup");
    } else {
      //   navigate("/");
      return <Component {...props} />;
    }
  };
  return Auth;
};

export default WithAuth;
