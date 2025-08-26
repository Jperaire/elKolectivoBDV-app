import { Button } from "@/shared/components";
import { unauthorizedGif } from "@/assets/gifs";
import styles from "./Unauthorized.module.css";

export const Unauthorized = () => (
    <div className="page">
        <h1>Accés no autoritzat</h1>
        <p>No tens permisos per visualitzar aquesta secció.</p>
        <img src={unauthorizedGif} className={styles.gif} />
        <Button to="/" variant="button--red">
            Torna a l'inici
        </Button>
    </div>
);
