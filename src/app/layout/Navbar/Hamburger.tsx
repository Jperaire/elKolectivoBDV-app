import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/shared/components";
import { CloseIcon, MenuIcon } from "@/assets/images";
import { ThemeSwitcher } from "@/features/theme/components";
import { useAuth, useLogout } from "@/features/auth/hooks";

import { BASE_LINKS, ADMIN_LINKS, USER_LINKS } from "./navLinks";

import styles from "./Hamburger.module.css";

export const Hamburger = () => {
    const [open, setOpen] = useState(false);
    const { user, userData, loading } = useAuth();
    const { logout, loggingOut } = useLogout();

    const links = [
        ...BASE_LINKS,
        ...(userData?.role === "user" ? USER_LINKS : []),
        ...(userData?.role === "admin" ? ADMIN_LINKS : []),
    ];

    return (
        <div className={styles.hamburgerMenu}>
            {!open && (
                <button
                    className={styles.burger}
                    onClick={() => setOpen(true)}
                    aria-label="Abrir menú"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                >
                    <img src={MenuIcon} alt="" />
                </button>
            )}

            <ul
                id="mobile-menu"
                className={`${styles.menuLinks} ${open ? styles.open : ""}`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!open}
            >
                {open && (
                    <button
                        className={styles.closeButton}
                        onClick={() => setOpen(false)}
                        aria-label="Cerrar menú"
                    >
                        <img src={CloseIcon} alt="" />
                    </button>
                )}

                {links.map((link) => (
                    <li key={link.path} onClick={() => setOpen(false)}>
                        <Link to={link.path}>{link.label}</Link>
                    </li>
                ))}

                {!loading && !user && (
                    <li onClick={() => setOpen(false)}>
                        <Button
                            to="/login"
                            variant="button--pink"
                            className={styles.cta}
                        >
                            Inicia sessió
                        </Button>
                    </li>
                )}

                {!loading && user && (
                    <li
                        className={styles.logoutItem}
                        onClick={async () => {
                            await logout();
                            setOpen(false);
                        }}
                    >
                        {loggingOut ? "Tancant…" : "Tanca sessió"}
                    </li>
                )}

                {userData?.role === "admin" && (
                    <li onClick={() => setOpen(false)}>
                        <Button
                            to="/admin"
                            variant="button--blue"
                            className={styles.cta}
                            aria-label="Zona Admin"
                            title="Zona Admin"
                        >
                            Zona Admin
                        </Button>
                    </li>
                )}

                <li>
                    <ThemeSwitcher />
                </li>
            </ul>
        </div>
    );
};
