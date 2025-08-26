import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { getUser } from "@/shared/services";

import { auth } from "../firebase/auth";
import { AppUserData } from "../types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<AppUserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);
            setUser(firebaseUser);

            if (!firebaseUser) {
                if (!cancelled) {
                    setUserData(null);
                    setLoading(false);
                }
                return;
            }

            try {
                const data = await getUser(firebaseUser.uid);
                if (!cancelled) {
                    setUserData(data);
                    setLoading(false);
                }
            } catch (e) {
                console.error("Error loading userData:", e);
                if (!cancelled) {
                    setUserData(null);
                    setLoading(false);
                }
            }
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, userData }}>
            {children}
        </AuthContext.Provider>
    );
};
