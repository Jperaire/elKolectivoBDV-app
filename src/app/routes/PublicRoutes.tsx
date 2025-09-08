import { Route } from "react-router-dom";

import { Home, Unauthorized, NotFound } from "@/pages/public";

import { Login, Register, ResetPassword } from "@/features/auth/pages";

import { Merch } from "@/features/merch/pages";
import { NewsDetailPage, NewsPage } from "@/features/news/pages";
import { ActivitiesPage } from "@/features/activities/pages";

export const PublicRoutes = (
    <>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="merch" element={<Merch />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:id" element={<NewsDetailPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
    </>
);
