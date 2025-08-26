import { themeVariables } from "@/shared/utils";
import styles from "./Pallete.module.css";

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
