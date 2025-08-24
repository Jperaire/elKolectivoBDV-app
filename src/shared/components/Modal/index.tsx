import React, { useEffect } from "react";
import styles from "./Modal.module.css";

type Props = {
    open: boolean;
    onClose: () => void;
    titleId?: string;
    children: React.ReactNode;
};

export const Modal = ({
    open,
    onClose,
    titleId = "modal-title",
    children,
}: Props) => {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={onClose}
        >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
