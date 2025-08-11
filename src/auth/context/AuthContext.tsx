import { createContext } from "react";

import { User } from "firebase/auth";
import { AppUserData } from "../types";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    userData: AppUserData | null;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    userData: null,
});
