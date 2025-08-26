import { Route } from "react-router-dom";

import { UserProfile } from "@/pages/user";
import { TestPage } from "@/features/membership/pages";

export const PrivateRoutes = (
    <Route path="user">
        <Route index element={<UserProfile />} />
        <Route path="test" element={<TestPage />} />
    </Route>
);
