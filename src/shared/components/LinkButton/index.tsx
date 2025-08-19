import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

type LinkButtonProps = {
    to: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "third";
    size?: "small" | "medium" | "large";
    className?: string;
};

export const LinkButton = ({
    to,
    children,
    variant = "primary",
    size = "medium",
    className = "",
}: LinkButtonProps) => {
    return (
        <Link
            to={to}
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className} `}
        >
            {children}
        </Link>
    );
};
