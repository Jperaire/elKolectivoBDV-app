import { createContext } from "react";

import { User } from "firebase/auth";
import { AppUserData } from "../../types/user";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => void;
    userData: AppUserData | null;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => {},
    userData: null,
});
