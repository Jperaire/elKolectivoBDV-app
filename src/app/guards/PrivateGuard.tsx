import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export const PrivateGuard = () => {
    const { user, loading } = useAuth();

    if (loading) return <p>Carregant...</p>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};
