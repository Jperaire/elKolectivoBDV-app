import { Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const AppRouter = () => {
    return (
        <Routes>
            {/* Public Routes */}
            {PublicRoutes}

            {/* Private Routes */}
            {PrivateRoutes}

            {/* Admin Routes */}
            {AdminRoutes}
        </Routes>
    );
};
