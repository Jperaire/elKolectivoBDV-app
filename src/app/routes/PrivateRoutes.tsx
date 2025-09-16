import { Route } from "react-router-dom";

import { UserProfile, Quiz } from "@/pages/user";

export const PrivateRoutes = (
    <Route path="user">
        <Route index element={<UserProfile />} />
        <Route path="quiz" element={<Quiz />} />
    </Route>
);
