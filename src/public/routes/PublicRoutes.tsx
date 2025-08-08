import { Route } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import {
    HomePage,
    LoginPage,
    RegisterPage,
    AboutPage,
    ContactPage,
    CalendarPage,
    NewsPage,
} from "../pages";

export const PublicRoutes = (
    <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="news" element={<NewsPage />} />
    </Route>
);
