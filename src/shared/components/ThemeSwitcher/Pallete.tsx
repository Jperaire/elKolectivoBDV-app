import styles from "./ThemeSwitcher.module.css";
import { themeVariables } from "../../utils/colors";

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
