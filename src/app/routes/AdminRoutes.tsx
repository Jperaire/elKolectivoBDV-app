import { Route } from "react-router-dom";

import { AdminDashboard, Resources } from "@/pages/admin";
import { Waitlist } from "@/features/merch/pages";
import { NewsManager } from "@/features/news/pages";
import { ActivitiesManager } from "@/features/activities/pages";
import { MembersManager } from "@/features/membership/pages";

export const AdminRoutes = (
    <Route path="admin">
        <Route index element={<AdminDashboard />} />
        <Route path="activities" element={<ActivitiesManager />} />
        <Route path="members" element={<MembersManager />} />
        <Route path="resources" element={<Resources />} />
        <Route path="news" element={<NewsManager />} />
        <Route path="waitlist" element={<Waitlist />} />
    </Route>
);
