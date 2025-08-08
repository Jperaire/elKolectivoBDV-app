import { Route } from "react-router-dom";
import { AdminGuard } from "../../routes/guards";

import { AdminLayout } from "../layout/AdminLayout";
import {
    AdminDashboard,
    ActivitiesManagerPage,
    AssembliesPage,
    TaskManagerPage,
    MembersManagerPage,
    ResourcesPage,
    NewsManagerPage,
    MembershipFormTogglePage,
} from "../pages";

export const AdminRoutes = (
    <Route path="/admin" element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="activities" element={<ActivitiesManagerPage />} />
            <Route path="assemblies" element={<AssembliesPage />} />
            <Route path="tasks" element={<TaskManagerPage />} />
            <Route path="members" element={<MembersManagerPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="news" element={<NewsManagerPage />} />
            <Route path="form-toggle" element={<MembershipFormTogglePage />} />
        </Route>
    </Route>
);
