import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/shared/components";
import { CloseIcon, MenuIcon } from "@/assets/images";
import { signOutUser } from "@/features/auth/firebase/methods";
import { ThemeSwitcher } from "@/features/theme/components";
import { useAuth } from "@/features/auth/hooks/useAuth";

import { BASE_LINKS, ADMIN_LINKS, USER_LINKS } from "./navLinks";

import styles from "./Hamburger.module.css";

export const Hamburger = () => {
    const [open, setOpen] = useState(false);
    const { user, userData, loading } = useAuth();
    const [signingOut, setSigningOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setSigningOut(true);
            await signOutUser();
            setOpen(false);
            navigate("/");
        } finally {
            setSigningOut(false);
        }
    };

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
                        <Button to="/login" variant="button--pink">
                            Inicia sessió
                        </Button>
                    </li>
                )}

                {!loading && user && (
                    <li
                        className={styles.logoutItem}
                        onClick={() => {
                            handleLogout();
                            setOpen(false);
                        }}
                    >
                        Tanca sessió
                    </li>
                )}

                {userData?.role === "admin" && (
                    <li onClick={() => setOpen(false)}>
                        <Button to="/admin" variant="button--blue">
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
