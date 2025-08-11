import { useState } from "react";
import { resetPassword } from "../../features/auth/firebase/methods";

export const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await resetPassword(email.trim());
            setMsg("Email de recuperación enviado");
        } catch {
            setMsg("Error al enviar email");
        }
    };

    return (
        <form onSubmit={handleReset}>
            <input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button>Reset contraseña</button>
            {msg && <p>{msg}</p>}
        </form>
    );
};
