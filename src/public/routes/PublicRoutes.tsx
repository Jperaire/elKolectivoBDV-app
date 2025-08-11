import { Route } from "react-router-dom";
import { PublicLayout } from "../../layouts/PublicLayout";
import {
    HomePage,
    LoginPage,
    RegisterPage,
    ContactPage,
    CalendarPage,
    NewsPage,
    Unauthorized,
    ResetPasswordPage,
    NotFound,
} from "../pages";

export const PublicRoutes = (
    <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFound />} />
    </Route>
);
