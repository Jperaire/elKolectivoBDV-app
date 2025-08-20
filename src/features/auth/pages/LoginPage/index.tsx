import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./LoginPage.module.css";
import { useForm } from "../../../../shared/hooks/useForm";
import { validateLogin } from "../../../../shared/utils";
import { loginWithEmail, loginWithGoogle } from "../../firebase/methods";
import { Button } from "../../../../shared/components";
import { useAuth } from "../../hooks/useAuth";

type LoginForm = { email: string; password: string };

export const LoginPage = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const { email, password, onInputChange, onResetForm } = useForm<LoginForm>({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (!loading && user) navigate("/user");
    }, [loading, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        setError(null);

        const msg = validateLogin({ email, password });
        if (msg) {
            setError(msg);
            return;
        }

        try {
            setSubmitting(true);
            await loginWithEmail(email, password);
            onResetForm();
            navigate("/");
        } catch (err: unknown) {
            if (err) {
                setError("Email o contrasenya incorrectes.");
            } else {
                setError("No s'ha pogut iniciar sessió. Torna-ho a intentar.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (submitting) return;
        setError(null);

        try {
            setSubmitting(true);
            await loginWithGoogle();
            navigate("/");
        } catch {
            setError("No s'ha pogut iniciar sessió amb Google.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.login}>
            <h1>Inicia sessió</h1>

            <form
                onSubmit={handleSubmit}
                className={styles.loginForm}
                noValidate
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Escriu la teva adreça electrònica"
                    value={email}
                    onChange={onInputChange}
                    required
                    inputMode="email"
                    autoComplete="email"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Escriu la teva contrasenya"
                    value={password}
                    onChange={onInputChange}
                    required
                    minLength={6}
                    autoComplete="current-password"
                />

                <Button isLoading={submitting} loadingText="Iniciant sessió...">
                    Inicia sessió
                </Button>

                <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    isLoading={submitting}
                    loadingText="Connectant..."
                >
                    Continua amb Google
                </Button>
            </form>

            <p className={styles.helperText}>
                Encara no tens usuari? Registra't
                <Link to="/register" className={styles.registerLink}>
                    {" "}
                    aquí
                </Link>
            </p>

            <div aria-live="polite" aria-atomic="true">
                {error && <p className={styles.error}>⚠️ {error}</p>}
            </div>
        </div>
    );
};
