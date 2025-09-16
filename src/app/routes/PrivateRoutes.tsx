import { Route } from "react-router-dom";

import { UserProfile } from "@/pages/user";
import { Quiz } from "@/features/quiz/Quiz";

export const PrivateRoutes = (
    <Route path="user">
        <Route index element={<UserProfile />} />
        <Route path="quiz" element={<Quiz />} />
    </Route>
);
