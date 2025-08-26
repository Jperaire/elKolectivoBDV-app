import { Route, Routes } from "react-router-dom";

import { AppLayout } from "../layout/AppLayout";
import { AdminGuard, PrivateGuard } from "../guards";
import { PublicRoutes, PrivateRoutes, AdminRoutes } from "./";

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
