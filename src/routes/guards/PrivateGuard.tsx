import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export const PrivateGuard = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};
