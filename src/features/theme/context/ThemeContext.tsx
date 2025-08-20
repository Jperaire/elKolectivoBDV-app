import { createContext } from "react";

export type Theme = "pastel" | "energetic";

export interface ThemeContextValue {
    theme: Theme;
    setTheme: (t: Theme) => void;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
    undefined
);
