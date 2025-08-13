import { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const Card = ({
    children,
    className = "",
    hoverEffect = true,
}: CardProps) => {
    return (
        <div
            className={`${styles.card} ${
                hoverEffect ? styles.hover : ""
            } ${className}`}
        >
            {children}
        </div>
    );
};
