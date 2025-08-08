import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = true;

export const PrivateGuard = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
