import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";

export const AdminGuard = () => {
    const { user, userData, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Cargando...</div>;
    }

    const isAdmin = !!user && userData?.role === "admin";

    return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};
