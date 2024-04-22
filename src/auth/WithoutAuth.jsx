import React from "react";

const WithoutAuth = (Component) => {
  const Auth = (props) => {
    let token = sessionStorage.getItem("token");

    if (!token) {
      return <Component {...props} />;
    } else {
      return (window.location = "/admin/dashboard");
    }
  };
  return Auth;
};

export default WithoutAuth;
