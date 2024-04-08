import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("login");

    if (!login) {
      navigate("/participant");
    }
  });

  return <>{Component}</>;
};

export default ProtectedRoute;
