import { useForm } from "../../../../shared/hooks/useForm";
import { useSubmitState } from "../../hooks/";
import { resetPassword } from "../../firebase/methods";

type ResetForm = { email: string };

export const ResetPasswordPage = () => {
    const { email, onInputChange, onResetForm } = useForm<ResetForm>({
        email: "",
    });
    const { error, success, submitting, start, stop, fail, ok } =
        useSubmitState();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        try {
            start();
            await resetPassword(email.trim().toLowerCase());
            ok("Email de recuperación enviado");
            onResetForm();
        } catch (err: unknown) {
            fail(err);
        } finally {
            stop();
        }
    };

    return (
        <form onSubmit={handleReset} noValidate>
            <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={email}
                onChange={onInputChange}
                required
                inputMode="email"
                autoComplete="email"
            />
            <button disabled={submitting}>
                {submitting ? "Enviando..." : "Reset contraseña"}
            </button>

            <div aria-live="polite" aria-atomic="true">
                {error && <p>⚠️ {error}</p>}
                {success && <p>{success}</p>}
            </div>
        </form>
    );
};
