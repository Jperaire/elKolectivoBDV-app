import { Routes } from "react-router-dom";
import { PublicRoutes } from "../public/routes/PublicRoutes";
import { PrivateRoutes } from "../private/routes/PrivateRoutes";
import { AdminRoutes } from "../admin/routes/AdminRoutes";

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
