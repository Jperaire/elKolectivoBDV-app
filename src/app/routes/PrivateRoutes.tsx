import { Route } from "react-router-dom";

import { MembershipTestPage, ProfilePage } from "../../pages/user";

export const PrivateRoutes = (
    <Route path="user">
        <Route index element={<ProfilePage />} />

        <Route path="test" element={<MembershipTestPage />} />
    </Route>
);
