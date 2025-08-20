import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "animate.css";
import "./styles/index.ts";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthProvider.tsx";
import { ThemeProvider } from "./features/theme/context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
