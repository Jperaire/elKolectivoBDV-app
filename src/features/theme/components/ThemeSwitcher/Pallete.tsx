import styles from "./ThemeSwitcher.module.css";
import { themeVariables } from "../../../../shared/utils";

export const Pallete = () => {
    return (
        <div className={styles.palette}>
            {themeVariables.map((color, i) => (
                <span
                    key={i}
                    className={styles.swatch}
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    );
};
