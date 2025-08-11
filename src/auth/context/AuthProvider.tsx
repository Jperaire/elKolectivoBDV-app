import { useEffect, useState } from "react";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/auth";
import { getUserFromFirestore } from "../../services/user-service";

import { AuthContext } from "./AuthContext";

import { AppUserData } from "../types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<AppUserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                try {
                    const data = await getUserFromFirestore(firebaseUser.uid);
                    setUserData(data);
                } catch (e) {
                    console.error("Error loading userData:", e);
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, userData }}>
            {children}
        </AuthContext.Provider>
    );
};
