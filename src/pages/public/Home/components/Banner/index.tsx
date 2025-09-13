import { Button } from "@/shared/components";
import { ThemeSwitcher } from "@/features/theme/components";

import styles from "./Banner.module.css";

export const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.bannerInfo}>
                <p className={styles.bannerKicker}>BENVINGUDIS A</p>

                <h1
                    className={`${styles.bannerLogo} animate__animated animate__backInDown`}
                    translate="no"
                    lang="zxx"
                >
                    <span className={styles.reversedK}>K</span>
                    OLECTIVO BDV
                </h1>

                <p className={styles.bannerSubtitle}>
                    EL COL·LECTIU LGTBINBQ+ DEL VALLÈS
                </p>
            </div>
            <Button
                to="/activities"
                variant="button--main"
                className={`animate__animated animate__pulse animate__infinite ${styles.mainBtn}`}
            >
                Properes activitats
            </Button>
            <div className={styles.themeSwitcher}>
                <ThemeSwitcher />
            </div>
        </div>
    );
};
