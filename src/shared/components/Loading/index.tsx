import styles from "./Loading.module.css";

interface Props {
    message?: string;
}

export const Loading = ({ message = "Carregant…" }: Props) => {
    return (
        <div className={styles.loading} role="status" aria-live="polite">
            <span className={styles.spinner} aria-hidden="true" />
            <span>{message}</span>
        </div>
    );
};
