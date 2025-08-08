import { Navigate, Outlet } from "react-router-dom";

const isAdmin = true;

export const AdminGuard = () => {
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};
