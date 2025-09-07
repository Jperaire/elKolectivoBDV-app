import { useState } from "react";

import type { EmailJSResponseStatus } from "@emailjs/browser";

import { validateContact } from "@/shared/utils";
import { sendEmail } from "@/shared/services";
import { Button } from "@/shared/components";
import { useForm } from "@/shared/hooks/useForm";

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
            await sendEmail({ name, email, message });
            onResetForm();
            setSuccess("Missatge enviat! 🎉");
        } catch (error: unknown) {
            console.error(error);

            if (
                typeof error === "object" &&
                error !== null &&
                "text" in error
            ) {
                const err = error as EmailJSResponseStatus;
                setError(`❌ ${err.text}`);
            } else if (error instanceof Error) {
                setError(`❌ ${error.message}`);
            } else {
                setError("❌ Error desconegut en enviar el missatge.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="page">
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={onInputChange}
                        required
                        autoComplete="name"
                        placeholder="El teu nom"
                    />
                </div>

                <div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={onInputChange}
                        required
                        autoComplete="email"
                        inputMode="email"
                        placeholder="El teu email"
                    />
                </div>

                <div>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={message}
                        onChange={onInputChange}
                        required
                        placeholder="Escriu el teu missatge"
                    />
                </div>

                <Button
                    type="submit"
                    isLoading={submitting}
                    loadingText="Enviant..."
                >
                    Enviar
                </Button>
            </form>
            <div aria-live="polite" aria-atomic="true">
                {error && <p className="error">⚠️ {error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
        </div>
    );
};
