import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Loading } from "@/shared/components";

export const PrivateGuard = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading message="Comprovant usuari..." />;
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};
