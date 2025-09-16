import styles from "./ProgressBar.module.css";

type Props = {
    value: number;
};

export const ProgressBar = ({ value }: Props) => {
    return (
        <div
            className={styles.progressBarWrapper}
            aria-label={`Progrés ${value}%`}
        >
            <div
                className={styles.progressBarFill}
                style={{ width: `${value}%` }}
            />
        </div>
    );
};
