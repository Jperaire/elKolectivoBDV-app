import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import { AuthContext } from "../../../features/auth/context/AuthContext";
import {
    loginWithEmail,
    loginWithGoogle,
} from "../../../features/auth/firebase/methods";
import { useForm } from "../../../shared/hooks/useForm";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

type LoginForm = { email: string; password: string };

export const LoginPage = () => {
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const [error, setError] = useState<string | null>(null);

    const { email, password, onInputChange, onResetForm } = useForm<LoginForm>({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (!loading && user) {
            navigate("/user");
        }
    }, [loading, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const cred = await loginWithEmail(email, password);
            console.log("Logged in user:", cred.user);
            onResetForm();
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
            navigate("/user");
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
            <form onSubmit={handleSubmit} className={styles.login}>
                <input
                    type="email"
                    name="email"
                    placeholder="Type your email"
                    value={email}
                    onChange={onInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Type your password"
                    value={password}
                    onChange={onInputChange}
                    required
                />
                <button className={styles.submitBtn}>Inicia sessió</button>
                <button
                    className={styles.submitBtn}
                    type="button"
                    onClick={handleGoogleLogin}
                >
                    Continua amb Google
                </button>
            </form>

            <p>
                Encara no tens usuari?{" "}
                <Link to="/register">Registra't aquí</Link>
            </p>

            {error && <p>{error}</p>}
        </>
    );
};

// TODO: Refactorizar normal "Button", centrar la "p"
