import styles from "./Unauthorized.module.css";
import { Button } from "../../../shared/components";
import { unauthorizedGif } from "../../../assets/gifs";

export const Unauthorized = () => (
    <div className={styles.container}>
        <h1 className={styles.title}>Accés no autoritzat</h1>
        <p className={styles.message}>
            No tens permisos per visualitzar aquesta secció.
        </p>
        <img src={unauthorizedGif} className={styles.gif} />
        <Button to="/" variant="button--red">
            Torna a l'inici
        </Button>
    </div>
);
