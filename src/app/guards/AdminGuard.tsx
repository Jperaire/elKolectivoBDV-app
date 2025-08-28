import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Loading } from "@/shared/components";

export const AdminGuard = () => {
    const { user, userData, loading } = useAuth();

    if (loading) {
        return <Loading message="Comprovant usuari..." />;
    }

    const isAdmin = !!user && userData?.role === "admin";

    return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};
