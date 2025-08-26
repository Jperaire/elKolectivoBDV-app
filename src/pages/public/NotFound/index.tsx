import styles from "./NotFound.module.css";
import { Button } from "@/shared/components";
import { notFoundGif } from "@/assets/gifs";

export const NotFound = () => {
    return (
        <div className="page">
            <h1>🤔 ¡Oops!</h1>
            <p>Sembla que t'has perdut...</p>

            <img
                src={notFoundGif}
                alt="Gat programador"
                className={styles.gif}
            />

            <Button to="/" variant="button--pink">
                🏠 Torna a l'inici
            </Button>
        </div>
    );
};
