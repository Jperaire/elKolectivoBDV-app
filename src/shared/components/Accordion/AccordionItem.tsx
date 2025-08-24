import { useState, ReactNode } from "react";
import { ArrowIcon } from "../../../assets/images";
import styles from "./Accordion.module.css";

interface AccordionItemProps {
    title: string;
    children: ReactNode;
}

export const AccordionItem = ({ title, children }: AccordionItemProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.item}>
            <button
                className={styles.header}
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                {title}
                <img
                    src={ArrowIcon}
                    className={`${styles.icon} ${open ? styles.open : ""}`}
                />
            </button>

            <div className={`${styles.panel} ${open ? styles.open : ""}`}>
                {children}
            </div>
        </div>
    );
};
