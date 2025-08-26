import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useForm } from "@/shared/hooks/useForm";
import { validateLogin } from "@/shared/utils";
import { Button, Card } from "@/shared/components";

import { useSubmitState } from "../../hooks";
import { loginWithEmail, loginWithGoogle } from "../../firebase/methods";
import { useAuth } from "../../hooks/useAuth";

import styles from "./LoginPage.module.css";

type LoginForm = { email: string; password: string };

export const LoginPage = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const { error, success, submitting, start, stop, fail, ok } =
        useSubmitState();

    const { email, password, onInputChange, onResetForm } = useForm<LoginForm>({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (!loading && user) navigate("/");
    }, [loading, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        const msg = validateLogin({ email, password });
        if (msg) {
            fail({ code: "", message: msg } as unknown);
            return;
        }

        try {
            start();
            await loginWithEmail(email.trim().toLowerCase(), password);
            onResetForm();
            ok("Sessió iniciada correctament 🎉");
        } catch (err: unknown) {
            fail(err);
        } finally {
            stop();
        }
    };

    const handleGoogleLogin = async () => {
        if (submitting) return;
        try {
            start();
            await loginWithGoogle();
            ok("Sessió iniciada amb Google");
        } catch (err: unknown) {
            fail(err);
        } finally {
            stop();
        }
    };

    if (loading) return <p>Carregant...</p>;

    return (
        <div className="page">
            <h1>Inicia sessió</h1>

            <Card>
                <section className={styles.login}>
                    <form onSubmit={handleSubmit} noValidate>
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
                        <div className={styles.buttons}>
                            <Button
                                isLoading={submitting}
                                loadingText="Iniciant sessió..."
                                variant="button--orange"
                                type="submit"
                            >
                                Inicia sessió
                            </Button>
                            <Button
                                type="button"
                                onClick={handleGoogleLogin}
                                isLoading={submitting}
                                loadingText="Connectant..."
                                variant="button--orange"
                            >
                                Continua amb Google
                            </Button>
                        </div>
                    </form>
                    <p className={styles.helperText}>
                        Encara no tens usuari? Registra't{" "}
                        <Link to="/register" className={styles.registerLink}>
                            aquí
                        </Link>
                    </p>
                    <p className={styles.forgot}>
                        <Link to="/reset-password">
                            No recordes la contrasenya?
                        </Link>
                    </p>

                    <div aria-live="polite" aria-atomic="true">
                        {error && <p className="error">⚠️ {error}</p>}
                        {success && <p className="success">{success}</p>}
                    </div>
                </section>
            </Card>
        </div>
    );
};
