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
};

export const Button = ({
    children,
    to,
    onClick,
    variant = "button--blue",
    size = "button--medium",
    className = "",
    type = "button",
}: Props) => {
    const classNames = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classNames}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={classNames}>
            {children}
        </button>
    );
};
