import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    if (isLoggedIn && user) return <Outlet />;
    return <Navigate to={"/login"} />;
};

export default ProtectedRoute;
