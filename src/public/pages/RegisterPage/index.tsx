import { useContext, useEffect, useState } from "react";
import { registerWithEmail } from "../../../features/auth/firebase/methods";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { AuthContext } from "../../../features/auth/context/AuthContext";
import { useForm } from "../../../shared/hooks/useForm";

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
            onResetForm();
            navigate("/user");
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
                    name="userName"
                    placeholder="Your name"
                    value={userName}
                    onChange={onInputChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={onInputChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onInputChange}
                    required
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={onInputChange}
                    required
                />

                <button type="submit">Register</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
};
