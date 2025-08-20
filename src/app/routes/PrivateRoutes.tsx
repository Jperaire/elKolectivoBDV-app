import { Route } from "react-router-dom";
import { PrivateGuard } from "../guards";

import { PrivateLayout } from "../../layouts/PrivateLayout";
import {
    MerchPage,
    DonationsPage,
    MembershipFormPage,
    ProfilePage,
    ActivitySignupPage,
} from "../../pages/user";

export const PrivateRoutes = (
    <Route path="/user" element={<PrivateGuard />}>
        <Route element={<PrivateLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="merch" element={<MerchPage />} />
            <Route path="donations" element={<DonationsPage />} />
            <Route path="membership-form" element={<MembershipFormPage />} />
            <Route path="signup" element={<ActivitySignupPage />} />
        </Route>
    </Route>
);
