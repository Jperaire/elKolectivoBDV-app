import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FirebaseError } from "firebase/app";
import { AuthContext } from "../../../features/auth/context/AuthContext";
import {
    loginWithEmail,
    loginWithGoogle,
} from "../../../features/auth/firebase/methods";

export const LoginPage = () => {
    const navigate = useNavigate();

    const { user, loading } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && user) {
            navigate("/user");
        }
    }, [loading, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const cred = await loginWithEmail(email, password);
            console.log("Logged in user:", cred.user);
            navigate("/user");
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                console.error("Login error:", err);
                setError(err.message);
            } else {
                console.error("Unknown error:", err);
                setError("Login failed");
            }
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        try {
            const cred = await loginWithGoogle();
            console.log("Google login user:", cred.user);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                console.error("Google login error:", err);
                setError(err.message);
            } else {
                console.error("Unknown error:", err);
                setError("Google login failed");
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Type your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Type your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button>Inicia sessió</button>
                <button type="button" onClick={handleGoogleLogin}>
                    Continua amb Google
                </button>
            </form>

            {error && <p>{error}</p>}
        </>
    );
};
