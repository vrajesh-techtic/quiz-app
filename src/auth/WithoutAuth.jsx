import React from "react";

const WithoutAuth = (Component) => {
  const Auth = (props) => {
    // let login =
    //   JSON.parse(localStorage.getItem("adminEmail"))?.verified || false;

    let token = sessionStorage.getItem("token");

    if (!token) {
      return <Component {...props} />;
    } else {
      return (window.location = "/admin/dashboard");
      //   return navigate("/");
    }
  };
  return Auth;
};

export default WithoutAuth;
