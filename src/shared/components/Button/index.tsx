import { Link } from "react-router-dom";
import React from "react";
import styles from "./Button.module.css";

type Props = {
    children: React.ReactNode;
    to?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    variant?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
    loadingText?: string;
    disabled?: boolean;
};

export const Button = ({
    children,
    to,
    onClick,
    variant = "button--blue",
    className = "",
    type = "button",
    isLoading = false,
    loadingText = "Loading...",
    disabled = false,
}: Props) => {
    const isDisabled = isLoading || disabled;

    const classNames = [
        styles.button,
        styles[variant],
        className,
        isDisabled ? styles["is-disabled"] : "",
    ]
        .filter(Boolean)
        .join(" ");

    const content = isLoading ? loadingText : children;

    if (to) {
        const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
            if (isDisabled) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            onClick?.(e);
        };

        return (
            <Link
                to={isDisabled ? "#" : to}
                className={classNames}
                aria-disabled={isDisabled}
                tabIndex={isDisabled ? -1 : 0}
                role="button"
                onClick={handleClick}
            >
                {content}
            </Link>
        );
    }

    const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {
        if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        onClick?.(e);
    };

    return (
        <button
            type={type}
            onClick={handleButtonClick}
            className={classNames}
            disabled={isDisabled}
            aria-disabled={isDisabled}
        >
            {content}
        </button>
    );
};
