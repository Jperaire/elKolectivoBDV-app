import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

type LinkButtonProps = {
    to: string;
    children: React.ReactNode;
    variant?: "button--purple" | "button--red" | "button--pink";
    size?: "small" | "medium" | "large";
    className?: string;
};

export const LinkButton = ({
    to,
    children,
    variant = "button--purple",
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
