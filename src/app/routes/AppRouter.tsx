import { Route, Routes } from "react-router-dom";
import { PublicRoutes, PrivateRoutes, AdminRoutes } from "./";
import { AppLayout } from "../layout/AppLayout";
import { AdminGuard, PrivateGuard } from "../guards";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                {PublicRoutes}

                <Route element={<PrivateGuard />}>{PrivateRoutes}</Route>

                <Route element={<AdminGuard />}>{AdminRoutes}</Route>
            </Route>
        </Routes>
    );
};
