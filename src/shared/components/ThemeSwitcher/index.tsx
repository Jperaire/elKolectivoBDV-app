import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

type Theme = "pastel" | "energetic";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>("pastel");

    const apply = (t: Theme) => {
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
        setTheme(t);
    };

    useEffect(() => {
        const saved = (localStorage.getItem("theme") as Theme) || "pastel";
        apply(saved);
    }, []);

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
                onClick={() => apply(isEnergetic ? "pastel" : "energetic")}
            >
                <span className={styles.thumb} />
            </button>
        </div>
    );
}
