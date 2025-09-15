import { useState } from "react";
import { loginWithEmail, loginWithGoogle } from "../firebase/methods";

export const useSignIn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getErrorMessage = (e: unknown) =>
        e instanceof Error ? e.message : "Error iniciant sessió";

    async function signInWithEmail(email: string, password: string) {
        setError(null);
        setLoading(true);
        try {
            await loginWithEmail(email.trim().toLowerCase(), password);
        } catch (e: unknown) {
            setError(getErrorMessage(e));
        } finally {
            setLoading(false);
        }
    }

    async function signInWithGoogle() {
        setError(null);
        setLoading(true);
        try {
            await loginWithGoogle();
        } catch (e: unknown) {
            setError(getErrorMessage(e));
        } finally {
            setLoading(false);
        }
    }

    return {
        signInWithEmail,
        signInWithGoogle,
        loading,
        error,
        setError,
    };
};
