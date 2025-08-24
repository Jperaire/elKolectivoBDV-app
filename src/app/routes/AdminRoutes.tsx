import { Route } from "react-router-dom";

import {
    AdminDashboard,
    ActivitiesManager,
    MembersManager,
    Resources,
    NewsManager,
} from "../../pages/admin";
import { Waitlist } from "../../features/merch/pages";

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
