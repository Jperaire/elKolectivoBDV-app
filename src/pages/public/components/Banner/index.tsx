import styles from "./Banner.module.css";
import { LinkButton } from "../../../../shared/components/LinkButton";
import { ThemeSwitcher } from "../../../../features/theme/components/ThemeSwitcher";

export const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.bannerInfo}>
                <p className={styles.bannerKicker}>BENVINGUDIS A</p>
                <h1
                    className={`${styles.bannerLogo} animate__animated animate__backInDown`}
                    translate="no"
                    lang="zxx"
                >
                    EL <span className={styles.reversedK}>K</span>
                    OLECTIVO BDV
                </h1>
                <p className={styles.bannerSubtitle}>
                    EL COLECTIU LGTBNBIQ+ DEL VALLÈS
                </p>
            </div>
            <LinkButton
                to="/calendar"
                variant="button--purple"
                size="large"
                className="animate__animated animate__pulse animate__infinite"
            >
                Properes activitats
            </LinkButton>

            <div className={styles.themeSwitcher}>
                <ThemeSwitcher />
            </div>
        </section>
    );
};
