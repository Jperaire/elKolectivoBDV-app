import { Route } from "react-router-dom";

import { ProfilePage } from "../../pages/user";
import { TestPage } from "../../features/membership/pages";

export const PrivateRoutes = (
    <Route path="user">
        <Route index element={<ProfilePage />} />
        <Route path="test" element={<TestPage />} />
    </Route>
);
