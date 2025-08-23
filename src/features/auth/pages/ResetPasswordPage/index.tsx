import styles from "./ResetPasswordPage.module.css";
import { useForm } from "../../../../shared/hooks/useForm";
import { useSubmitState } from "../../hooks/";
import { resetPassword } from "../../firebase/methods";
import { Button } from "../../../../shared/components";

const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

type ResetForm = { email: string };

export const ResetPasswordPage = () => {
    const { email, onInputChange, onResetForm } = useForm<ResetForm>({
        email: "",
    });
    const { error, success, submitting, start, stop, fail, ok } =
        useSubmitState();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting || !isEmail(email)) return;
        try {
            start();
            await resetPassword(email.trim().toLowerCase());
            ok(
                "Hem enviat un correu per restablir la contrasenya. Revisa la bústia i Spam/Promocions."
            );
            onResetForm();
        } catch (err: unknown) {
            fail(err);
        } finally {
            stop();
        }
    };

    return (
        <div className={styles.reset}>
            <h1>Recuperar contrasenya</h1>

            <form onSubmit={handleReset} noValidate className={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="El teu email"
                    value={email}
                    onChange={onInputChange}
                    required
                    inputMode="email"
                    autoComplete="email"
                    className={styles.input}
                />

                <Button
                    type="submit"
                    isLoading={submitting}
                    loadingText="Enviant..."
                >
                    Enviar enllaç
                </Button>
            </form>

            <div
                aria-live="polite"
                aria-atomic="true"
                className={styles.feedback}
            >
                {error && <p className={styles.error}>⚠️ {error}</p>}
                {success && (
                    <div className={styles.successBox}>
                        <p className={styles.success}>{success}</p>
                        <Button to="/login" variant="button--blue">
                            Tornar a iniciar sessió
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
