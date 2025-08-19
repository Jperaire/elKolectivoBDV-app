import styles from "./Button.module.css";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit";
    isLoading?: boolean;
    loadingText?: string;
};

export const Button = ({
    children,
    onClick,
    disabled,
    className,
    type = "submit",
    isLoading = false,
    loadingText,
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.Button} ${className || ""}`}
            aria-busy={isLoading}
        >
            {isLoading ? loadingText || "..." : children}
        </button>
    );
};
