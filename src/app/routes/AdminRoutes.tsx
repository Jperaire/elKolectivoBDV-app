import { Route } from "react-router-dom";
import { AdminGuard } from "../guards";

import { AdminLayout } from "../../layouts/AdminLayout";
import {
    AdminDashboard,
    ActivitiesManager,
    MembersManager,
    Resources,
    NewsManager,
} from "../../pages/admin";

export const AdminRoutes = (
    <Route path="/admin" element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="activities" element={<ActivitiesManager />} />
            <Route path="members" element={<MembersManager />} />
            <Route path="resources" element={<Resources />} />
            <Route path="news" element={<NewsManager />} />
        </Route>
    </Route>
);
