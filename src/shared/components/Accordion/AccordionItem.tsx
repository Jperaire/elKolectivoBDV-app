import { useState, ReactNode } from "react";
import styles from "./Accordion.module.css";
import { ArrowIcon } from "../../../assets/images/icons";

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
            {open && <div className={styles.panel}>{children}</div>}
        </div>
    );
};
