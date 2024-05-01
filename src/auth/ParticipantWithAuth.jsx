import React from "react";

const ParticipantWithAuth = (Component) => {
  const Auth = (props) => {
    let token = sessionStorage.getItem("token");

    if (!token) {
      return (window.location = "/participant/login");
    } else {
      return <Component {...props} />;
    }
  };
  return Auth;
};

export default ParticipantWithAuth;
