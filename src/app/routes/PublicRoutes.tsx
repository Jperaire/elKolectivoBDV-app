import { Route } from "react-router-dom";

import {
    HomePage,
    CalendarPage,
    NewsPage,
    Unauthorized,
    NotFound,
    DonationsPage,
} from "../../pages/public";

import {
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
} from "../../features/auth/pages";

import { MerchPage } from "../../features/merch/pages";

export const PublicRoutes = (
    <>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="merch" element={<MerchPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="donations" element={<DonationsPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFound />} />
    </>
);
