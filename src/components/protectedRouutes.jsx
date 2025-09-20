import React from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRouutes({ children }) {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const token = JSON.parse(authToken);
  if (token) {
    return children;
  } else {
    navigate("/");
  }
}

export default ProtectedRouutes;
