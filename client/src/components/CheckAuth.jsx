import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/" />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.userType === "teacher") {
      return <Navigate to="/teacher/dashboard" />;
    } else {
      return <Navigate to="/user/home" />;
    }
  }
  if (
    isAuthenticated &&
    user?.userType !== "teacher" &&
    location.pathname.includes("teacher")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenticated &&
    user?.userType === "teacher" &&
    location.pathname.includes("user")
  ) {
    return <Navigate to="/admin/dashbord" />;
  }
  return <>{children}</>;
};

export default CheckAuth;
