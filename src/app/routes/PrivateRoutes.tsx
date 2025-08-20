import { Route } from "react-router-dom";

import {
    MerchPage,
    DonationsPage,
    MembershipTestPage,
    ProfilePage,
} from "../../pages/user";

export const PrivateRoutes = (
    <Route path="user">
        <Route index element={<ProfilePage />} />
        <Route path="merch" element={<MerchPage />} />
        <Route path="donations" element={<DonationsPage />} />
        <Route path="test" element={<MembershipTestPage />} />
    </Route>
);
