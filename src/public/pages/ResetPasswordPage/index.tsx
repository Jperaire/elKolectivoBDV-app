import { useState } from "react";
import { resetPassword } from "../../../features/auth/firebase/methods";
import { useForm } from "../../../shared/hooks/useForm";

type ResetForm = { email: string };

export const ResetPasswordPage = () => {
    const [msg, setMsg] = useState("");

    const { email, onInputChange, onResetForm } = useForm<ResetForm>({
        email: "",
    });

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await resetPassword(email.trim());
            setMsg("Email de recuperación enviado");
            onResetForm();
        } catch {
            setMsg("Error al enviar email");
        }
    };

    return (
        <form onSubmit={handleReset}>
            <input
                type="email"
                name="email"
                placeholder="Tu email"
                value={email}
                onChange={onInputChange}
                required
            />
            <button>Reset contraseña</button>
            {msg && <p>{msg}</p>}
        </form>
    );
};
