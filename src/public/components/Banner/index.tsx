import styles from "./Banner.module.css";
import logo from "../../../assets/images/logos/main-logo.png";
import { ButtonLink } from "../../../shared/components/ButtonLink";

export const Banner = () => {
    return (
        <div className={styles.container}>
            <p className={styles.welcome}>BENVINGUDIS A</p>
            <img src={logo} alt="Logo associación" className={styles.logo} />
            <p className={styles.subtitle}>EL COLECTIU LGTBNBIQ+ DEL VALLÈS</p>
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
