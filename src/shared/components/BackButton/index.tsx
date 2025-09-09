import { Button } from "@/shared/components";
import { BackIcon } from "@/assets/images";
import styles from "./BackButton.module.css";

type BackButtonProps = {
    to?: string;
    label?: string;
};

export const BackButton = ({ to, label = "Enrere" }: BackButtonProps) => {
    return (
        <div className={styles.wrapper}>
            <Button to={to} variant="button--blue">
                <img
                    src={BackIcon}
                    className={styles.icon}
                    alt=""
                    aria-hidden
                />
                {label}
            </Button>
        </div>
    );
};
