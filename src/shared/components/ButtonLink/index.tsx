import { Link } from "react-router-dom";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
    to: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "third";
    size?: "small" | "medium" | "large";
    className?: string;
};

export const ButtonLink = ({
    to,
    children,
    variant = "primary",
    size = "medium",
    className = "",
}: ButtonLinkProps) => {
    return (
        <Link
            to={to}
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className} `}
        >
            {children}
        </Link>
    );
};
