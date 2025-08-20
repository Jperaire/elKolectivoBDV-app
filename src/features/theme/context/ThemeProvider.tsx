import { useState, useEffect } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = localStorage.getItem("theme") as Theme | null;
        return saved ?? "energetic";
    });

    const setTheme = (t: Theme) => {
        setThemeState(t);
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
    };

    const toggleTheme = () => {
        setTheme(theme === "energetic" ? "pastel" : "energetic");
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
