import React from "react";

const ParticipantWithoutAuth = (Component) => {
  const Auth = (props) => {
    return <Component {...props} />;
  };
  return Auth;
};

export default ParticipantWithoutAuth;
