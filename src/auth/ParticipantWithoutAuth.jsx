import React from "react";

const ParticipantWithoutAuth = (Component) => {
  const Auth = (props) => {
    // let login =
    //   JSON.parse(localStorage.getItem("participantEmail"))?.verified || false;
    let token = sessionStorage.getItem("token");
    if (!token) {
      return <Component {...props} />;
    } else {
      return (window.location = "/participant/login");
      //   navigate("/");
    }
  };
  return Auth;
};

export default ParticipantWithoutAuth;
