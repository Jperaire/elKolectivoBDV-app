import { useContext } from "react";
import styles from "./ThemeSwitcher.module.css";
import { ThemeContext } from "../../context/ThemeContext";

export const ThemeSwitcher = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx)
        throw new Error("ThemeSwitcher must be used within ThemeProvider");

    const { theme, setTheme } = ctx;

    return (
        <div className={styles.segment} role="group" aria-label="Theme">
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
