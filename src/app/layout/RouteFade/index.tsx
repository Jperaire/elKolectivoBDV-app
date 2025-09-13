import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DURATION = 180; // ms
const EASE = "ease-in-out";

function fade(el: HTMLElement, to: number, immediate = false) {
    el.style.transition = immediate ? "none" : `opacity ${DURATION}ms ${EASE}`;
    el.style.opacity = String(to);
}

function isInternalAnchor(a: HTMLAnchorElement) {
    if (a.target && a.target !== "_self") return false;
    if (a.hasAttribute("download")) return false;
    if (a.origin !== window.location.origin) return false;
    return true;
}

function normUrl(path: string) {
    return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
}

export function RouteFade() {
    const navigate = useNavigate();
    const { pathname, search, hash } = useLocation();

    useEffect(() => {
        const root = document.getElementById("root");
        if (!root) return;
        root.style.opacity = "1";
        root.style.willChange = "opacity";
    }, []);

    useEffect(() => {
        const root = document.getElementById("root");
        if (!root) return;
        requestAnimationFrame(() => fade(root, 1, false));
    }, [pathname, search, hash]);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const target = e.target as Element | null;
            const a = target?.closest?.("a") as HTMLAnchorElement | null;
            if (!a) return;

            const me = e as MouseEvent;
            if (me.metaKey || me.ctrlKey || me.altKey || me.shiftKey) return;
            if (!isInternalAnchor(a)) return;
            if (e.defaultPrevented) return;

            e.preventDefault();

            const to = a.pathname + a.search + a.hash;
            const current =
                window.location.pathname +
                window.location.search +
                window.location.hash;

            const toN = normUrl(to);
            const curN = normUrl(current);

            const root = document.getElementById("root");

            if (toN === curN) {
                if (!root) return;
                fade(root, 1, true);
                requestAnimationFrame(() => {
                    fade(root, 0, false);
                    window.setTimeout(() => fade(root, 1, false), DURATION); // in
                });
                return;
            }

            if (!root) {
                navigate(to);
                return;
            }

            fade(root, 1, true);
            requestAnimationFrame(() => {
                fade(root, 0, false);
                window.setTimeout(() => navigate(to), DURATION);
            });
        };

        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, [navigate]);

    useEffect(() => {
        const onPopState = () => {
            const root = document.getElementById("root");
            if (!root) return;
            fade(root, 0, true);
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    return null;
}
