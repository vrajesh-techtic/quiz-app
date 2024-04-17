import React from "react";

const ParticipantWithAuth = (Component) => {
  const Auth = (props) => {
    // let login =
    //   JSON.parse(localStorage.getItem("participantEmail"))?.verified || false;

    let token = sessionStorage.getItem("token");

    if (!token) {
      return (window.location = "/participant/login");
    } else {
      //   navigate("/");
      return <Component {...props} />;
    }
  };
  return Auth;
};

export default ParticipantWithAuth;
