import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth, useSignIn } from "@/features/auth/hooks";
import { useForm } from "@/shared/hooks";
import { Button, Card, Loading } from "@/shared/components";
import { LoginForm } from "../../types";

import styles from "./Login.module.css";

export const Login = () => {
    const navigate = useNavigate();
    const { user, loading: checking } = useAuth();
    const { signInWithEmail, signInWithGoogle, loading, error, setError } =
        useSignIn();
    const { email, password, onInputChange } = useForm<LoginForm>({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (!checking && user) navigate("/");
    }, [checking, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Falten camps");
            return;
        }
        await signInWithEmail(email, password);
    };

    if (checking) return <Loading message="Comprovant sessió…" />;

    return (
        <div className="page">
            <Card className={styles.card}>
                <h1>Inicia sessió</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correu electrònic"
                        value={email}
                        onChange={onInputChange}
                        autoComplete="email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contrasenya"
                        value={password}
                        onChange={onInputChange}
                        autoComplete="current-password"
                        required
                        minLength={6}
                    />
                    <div className={styles.buttons}>
                        <Button
                            type="submit"
                            variant="button--orange"
                            isLoading={loading}
                            loadingText="Iniciant…"
                        >
                            Inicia sessió
                        </Button>
                        <Button
                            type="button"
                            variant="button--blue"
                            onClick={signInWithGoogle}
                            isLoading={loading}
                            loadingText="Connectant…"
                        >
                            Continua amb Google
                        </Button>
                    </div>
                </form>

                {error && <p className={styles.error}>⚠️ {error}</p>}

                <p className={styles.helper}>
                    Encara no tens usuari?{" "}
                    <Link to="/register">Registra't aquí</Link>
                </p>
                <p className={styles.forgot}>
                    <Link to="/reset-password">
                        Has oblidat la contrasenya?
                    </Link>
                </p>
            </Card>
        </div>
    );
};
