import { ReactNode } from "react";
import styles from "./PageTitle.module.css";
import { Card } from "../Card";

interface PageTitleProps {
    children: ReactNode;
    subtitle?: ReactNode;
    className?: string;
}

export const PageTitle = ({
    children,
    subtitle,
    className = "",
}: PageTitleProps) => {
    return (
        <Card
            hoverEffect={false}
            className={`${styles.pageTitle} ${className}`}
        >
            <h1>{children}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </Card>
    );
};

// TODO: APLICAR EN: Inicia sessió, Formulari de registre, 🤯 Oops!, Membership Test, Mi perfil... Y YA QUE ESTOY EN TODO LO DEMÁS
