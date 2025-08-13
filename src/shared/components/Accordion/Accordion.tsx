import { ReactNode } from "react";
import styles from "./Accordion.module.css";

interface AccordionProps {
    children: ReactNode;
}

export const Accordion = ({ children }: AccordionProps) => {
    return <div className={styles.accordion}>{children}</div>;
};
