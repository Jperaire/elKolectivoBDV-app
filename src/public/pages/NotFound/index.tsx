import styles from "./NotFound.module.css";
import { ButtonLink } from "../../../shared/components";

export const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1>🤔 ¡Oops!</h1>
            <p>Sembla que t'has perdut...</p>

            <img
                src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif"
                alt="Gat programador"
                className={styles.gif}
            />

            <ButtonLink to="/" variant="third">
                🏠 Torna a l'inici
            </ButtonLink>
        </div>
    );
};
