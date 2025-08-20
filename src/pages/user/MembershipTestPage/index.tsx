import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../features/auth/context/AuthContext";
import { saveMembershipTest } from "../../../services/user-service";

export const MembershipTestPage = () => {
    const { user } = useContext(AuthContext);
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
        await saveMembershipTest(user.uid, answers);
        setSubmitted(true);
    };

    if (submitted) {
        return <p>✅ Thanks! An admin will review your test soon.</p>;
    }

    return (
        <div>
            <h1>Membership Test</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Why do you want to join?
                    <textarea
                        name="q1"
                        value={answers.q1}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Which activities interest you most?
                    <input
                        name="q2"
                        value={answers.q2}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
