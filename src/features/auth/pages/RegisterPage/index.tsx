import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { useForm } from "../../../../shared/hooks/useForm";
import { validateRegister } from "../../../../shared/utils";
import { registerWithEmail } from "../../firebase/methods";
import { Button } from "../../../../shared/components";

import styles from "./RegisterPage.module.css";

type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterPage = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const {
        userName,
        email,
        password,
        confirmPassword,
        onInputChange,
        onResetForm,
    } = useForm<RegisterForm>({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!loading && user) navigate("/user");
    }, [loading, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        setError(null);
        setSuccess(null);

        const msg = validateRegister({
            userName,
            email,
            password,
            confirmPassword,
        });
        if (msg) {
            setError(msg);
            return;
        }

        try {
            setSubmitting(true);
            await registerWithEmail(userName, email, password);
            onResetForm();
            setSuccess("T'has registrat correctament 🎉");
            navigate("/");
        } catch (err: unknown) {
            if (err) {
                setError("Error en el registre. Torna-ho a intentar.");
            } else {
                setError("Registration failed");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.register}>
            <h1>Formulari de registre</h1>

            <form
                onSubmit={handleSubmit}
                className={styles.registerForm}
                noValidate
            >
                <input
                    type="text"
                    name="userName"
                    placeholder="Escriu el teu nom"
                    value={userName}
                    onChange={onInputChange}
                    required
                    autoComplete="name"
                />

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
                    placeholder="Contrasenya"
                    value={password}
                    onChange={onInputChange}
                    required
                    minLength={6}
                    autoComplete="new-password"
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirma la contrasenya"
                    value={confirmPassword}
                    onChange={onInputChange}
                    required
                    autoComplete="new-password"
                />

                <Button isLoading={submitting} loadingText="Creant compte...">
                    Registrar-se
                </Button>
            </form>

            <div aria-live="polite" aria-atomic="true">
                {error && <p className={styles.error}>⚠️ {error}</p>}
                {success && <p className={styles.success}>{success}</p>}
            </div>
        </div>
    );
};
