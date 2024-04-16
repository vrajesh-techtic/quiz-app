import React from "react";

const ParticipantWithoutAuth = (Component) => {
  const Auth = (props) => {
    let login =
      JSON.parse(localStorage.getItem("participantEmail"))?.verified || false;

    if (!login) {
      return <Component {...props} />;
    } else {
      return (window.location = "/");
      //   navigate("/");
    }
  };
  return Auth;
};

export default ParticipantWithoutAuth;
