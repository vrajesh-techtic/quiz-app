import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContextAPI from "./ContextAPI";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  const { isUserAuth } = useContext(ContextAPI);

  useEffect(() => {
    let login = isUserAuth;

    if (!login) {
      navigate("/");
    }
  });

  return <>{Component}</>;
};

export default ProtectedRoute;
