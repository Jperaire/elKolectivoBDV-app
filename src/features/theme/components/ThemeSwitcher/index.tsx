import { useContext } from "react";

import styles from "./ThemeSwitcher.module.css";
import { Pallete } from "./Pallete";
import { ThemeContext } from "../../context/ThemeContext";

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

            <Pallete />
        </div>
    );
};

//
