import { useEffect, useState } from "react";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../firebase/auth/auth";
import { getUserFromFirestore } from "../../firebase/auth/user-service";

import { AuthContext } from "./AuthContext";

import { AppUserData } from "../../types/user";

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

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, userData, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
