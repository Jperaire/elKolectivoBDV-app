import { useContext, useEffect, useState } from "react";
import { registerWithEmail } from "../../firebase/auth/methods";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export const RegisterPage = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && user) {
            navigate("/user");
        }
    }, [loading, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const cred = await registerWithEmail(userName, email, password);
            console.log("Registered user:", cred.displayName);
        } catch (err: unknown) {
            if (err instanceof FirebaseError) {
                console.error("Registration error:", err);
                setError(err.message);
            } else {
                setError("Registration failed");
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
};
