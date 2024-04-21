import React from "react";

const ParticipantWithoutAuth = (Component) => {
  const Auth = (props) => {
    // let login =
    //   JSON.parse(localStorage.getItem("participantEmail"))?.verified || false;
    // let token = sessionStorage.getItem("token");
    // if (!token) {
    // } else {
    //   return (window.location = "/participant/login");
    //   //   navigate("/");
    // }
    return <Component {...props} />;
  };
  return Auth;
};

export default ParticipantWithoutAuth;
