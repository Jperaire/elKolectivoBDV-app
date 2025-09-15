import { useState } from "react";
import { loginWithEmail, loginWithGoogle } from "../firebase/methods";
import { authErrorMessage } from "../utils/authErrorMessage";

export function useSignIn() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function signInWithEmail(email: string, password: string) {
        setError(null);
        setLoading(true);
        try {
            await loginWithEmail(email.trim().toLowerCase(), password);
        } catch (e: unknown) {
            setError(authErrorMessage(e));
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
            setError(authErrorMessage(e));
        } finally {
            setLoading(false);
        }
    }

    return { signInWithEmail, signInWithGoogle, loading, error, setError };
}
