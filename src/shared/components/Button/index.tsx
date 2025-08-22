import { Link } from "react-router-dom";
import styles from "./Button.module.css";

type Props = {
    children: React.ReactNode;
    to?: string;
    onClick?: () => void;
    variant?: string;
    size?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
    loadingText?: string;
};

export const Button = ({
    children,
    to,
    onClick,
    variant = "button--blue",
    size = "button--medium",
    className = "",
    type = "button",
    isLoading = false,
    loadingText = "Loading...",
}: Props) => {
    const classNames = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;
    const content = isLoading ? loadingText : children;

    if (to) {
        return (
            <Link to={to} className={classNames} aria-disabled={isLoading}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames}
            disabled={isLoading}
        >
            {content}
        </button>
    );
};
