import { useContext } from "react";

import styles from "./ThemeSwitcher.module.css";
import { ThemeContext } from "../../../context/Theme/ThemeContext";
import { themeVariables } from "../../utils/colors";

export const ThemeSwitcher = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx)
        throw new Error("ThemeSwitcher must be used within ThemeProvider");

    const { theme, toggleTheme } = ctx;
    const isEnergetic = theme === "energetic";

    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                className={styles.toggle}
                aria-pressed={isEnergetic}
                aria-label={`Canviar tema a ${
                    isEnergetic ? "pastel" : "energètic"
                }`}
                onClick={toggleTheme}
            >
                <span className={styles.thumb}>
                    {isEnergetic ? "⚡" : "🧁"}
                </span>
            </button>

            <div className={styles.palette}>
                {themeVariables.map((color, i) => (
                    <span
                        key={i}
                        className={styles.swatch}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </div>
    );
};
