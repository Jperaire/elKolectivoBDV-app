import { useState } from "react";
import { serverTimestamp } from "firebase/database";
import { updateUser } from "@/shared/services";
import { useAuth } from "@/features/auth/hooks";

export const TestPage = () => {
    const { user } = useAuth();
    const [answers, setAnswers] = useState({ q1: "", q2: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        await updateUser(user.uid, {
            membershipTest: {
                answers,
                status: "pending",
                submittedAt: serverTimestamp(),
            },
        });

        setSubmitted(true);
    };

    if (submitted) {
        return <p>✅ Gràcies! Un/a admin revisarà el teu test ben aviat.</p>;
    }

    return (
        <div>
            <h1>Prova de membresia</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Per què vols unir-te?
                    <textarea
                        name="q1"
                        value={answers.q1}
                        onChange={handleChange}
                        required
                        placeholder="Explica'ns els teus motius…"
                    />
                </label>

                <label>
                    Quines activitats t’interessen més?
                    <input
                        name="q2"
                        value={answers.q2}
                        onChange={handleChange}
                        placeholder="Tallers, assemblees, sortides, etc."
                    />
                </label>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};
