import { createContext } from "react";

import { User } from "firebase/auth";

interface AuthContext {
    user: User | null;
    loading: boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContext>({
    user: null,
    loading: true,
    logout: async () => {},
});
