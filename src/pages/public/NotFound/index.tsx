import styles from "./NotFound.module.css";
import { LinkButton } from "../../../shared/components";
import { notFoundGif } from "../../../assets/gifs";

export const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1>🤔 ¡Oops!</h1>
            <p>Sembla que t'has perdut...</p>

            <img
                src={notFoundGif}
                alt="Gat programador"
                className={styles.gif}
            />

            <LinkButton to="/" variant="button--pink">
                🏠 Torna a l'inici
            </LinkButton>
        </div>
    );
};
