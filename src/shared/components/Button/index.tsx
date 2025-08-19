import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "third";
type Size = "small" | "medium" | "large";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit";
    isLoading?: boolean;
    loadingText?: string;
    variant?: Variant;
    size?: Size;
};

export const Button = ({
    children,
    onClick,
    disabled,
    className = "",
    type = "submit",
    isLoading = false,
    loadingText,
    variant = "primary",
    size = "medium",
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            aria-busy={isLoading}
        >
            {isLoading ? loadingText || "..." : children}
        </button>
    );
};
