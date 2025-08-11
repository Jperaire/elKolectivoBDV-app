import { useContext, useEffect, useState } from "react";
import { loginWithEmail } from "../../firebase/auth/auth-methods";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export const LoginPage = () => {
    const navigate = useNavigate();

    const { user, loading } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!loading && user) {
            navigate("/user");
        }
    }, [loading, user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const cred = await loginWithEmail(email, password);
            console.log("Logged-in user:", cred.user);
        } catch (error) {
            console.error("Error logging in::", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Type your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Type your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button>Iniciar sesión</button>
            </form>
        </>
    );
};
