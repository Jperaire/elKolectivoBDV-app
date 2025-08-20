import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export const AdminGuard = () => {
    const { user, userData, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>;
    }

    const isAdmin = !!user && userData?.role === "admin";

    return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};
