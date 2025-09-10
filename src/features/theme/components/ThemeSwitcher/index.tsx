import { useTheme } from "../../hooks/useTheme";
import styles from "./ThemeSwitcher.module.css";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div
            className={styles.segment}
            role="group"
            aria-label="Theme"
            title="Canva entre tema clar i tema de colors"
        >
            <button
                type="button"
                className={styles.segmentBtn}
                aria-pressed={theme === "pastel"}
                onClick={() => setTheme("pastel")}
            >
                🧁
            </button>
            <button
                type="button"
                className={styles.segmentBtn}
                aria-pressed={theme === "energetic"}
                onClick={() => setTheme("energetic")}
            >
                ⚡
            </button>
        </div>
    );
};
