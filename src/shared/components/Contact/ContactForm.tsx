import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { validateContact } from "../../utils";
import { Button } from "../Button";

export const ContactForm = () => {
    const { name, email, message, onInputChange, onResetForm } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        const msg = validateContact({ name, email, message });
        if (msg) {
            setError(msg);
            return;
        }

        try {
            setSubmitting(true);
            // TODO: enviar mail
            console.log({ name, email, message });
            onResetForm();
            setSuccess("Missatge enviat! 🎉");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="name">Nom</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={onInputChange}
                        required
                        autoComplete="name"
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={onInputChange}
                        required
                        autoComplete="email"
                        inputMode="email"
                    />
                </div>

                <div>
                    <label htmlFor="message">Missatge</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={message}
                        onChange={onInputChange}
                        required
                    />
                </div>

                <Button isLoading={submitting} loadingText="Enviant...">
                    Enviar
                </Button>
            </form>

            <div aria-live="polite" aria-atomic="true">
                {error && <p className="error">⚠️ {error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
        </>
    );
};
