import { ReactNode, CSSProperties } from "react";
import styles from "./Card.module.css";

interface CardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    style?: CSSProperties;
}

export const Card = ({
    children,
    className = "",
    hoverEffect = false,
    style = {},
}: CardProps) => {
    return (
        <div
            className={`${styles.card} ${
                hoverEffect ? styles.hover : ""
            } ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};
