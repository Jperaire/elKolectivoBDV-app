import styles from "./Banner.module.css";
import { ButtonLink } from "../../../shared/components/ButtonLink";

export const Banner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infoBanner}>
                <p className={styles.welcome}>BENVINGUDIS A</p>
                <h1
                    className={`${styles.logo} animate__animated animate__backInDown`}
                >
                    EL <span className={styles.reversedK}>K</span>
                    OLECTIVO BDV
                </h1>
                <p className={styles.subtitle}>
                    EL COLECTIU LGTBNBIQ+ DEL VALLÈS
                </p>
            </div>
            <ButtonLink
                to="/calendar"
                variant="third"
                size="large"
                className="animate__animated animate__pulse animate__infinite"
            >
                Properes activitats
            </ButtonLink>
        </div>
    );
};
