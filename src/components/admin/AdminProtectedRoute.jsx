import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("admin");

    if (!login) {
      navigate("/admin");
    }
  });
  return <>{Component}</>;
};

export default AdminProtectedRoute;
