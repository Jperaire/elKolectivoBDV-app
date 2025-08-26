import { useState } from "react";
import { CopyIcon } from "@/assets/images";
import styles from "./Copy.module.css";

type Props = {
    value: string;
    title?: string;
    className?: string;
};

export const Copy = ({ value, title = "Copiar", className = "" }: Props) => {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
    };

    return (
        <button
            type="button"
            className={`${styles.copyIcon} ${className}`}
            aria-label={title}
            title={title}
            onClick={handleClick}
        >
            {copied ? (
                <span className={styles.copied} aria-hidden="true">
                    Copiat!
                </span>
            ) : (
                <img src={CopyIcon} alt="" />
            )}
        </button>
    );
};
