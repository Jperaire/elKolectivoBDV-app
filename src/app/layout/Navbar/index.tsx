import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

import { Button, Loading } from "@/shared/components";
import { MainLogo, UserIcon } from "@/assets/images/index";
import { useAuth, useLogout } from "@/features/auth/hooks";

import { BASE_LINKS } from "./navLinks";
import { Hamburger } from "./Hamburger";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const { user, userData, loading } = useAuth();
    const { logout, loggingOut } = useLogout();

    const detailsRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                detailsRef.current &&
                !detailsRef.current.contains(e.target as Node)
            ) {
                detailsRef.current.removeAttribute("open");
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className={styles.navbar} aria-label="Primary">
            <div className={styles.navbarContent}>
                <Link to="/" className={styles.logoWrapper}>
                    <img
                        src={MainLogo}
                        alt="Kolectivo BDV"
                        className={styles.logo}
                    />
                </Link>

                <ul className={styles.navLinks}>
                    {BASE_LINKS.map((l) => (
                        <li key={l.path}>
                            <NavLink to={l.path}>{l.label}</NavLink>
                        </li>
                    ))}

                    {!loading && userData?.role === "admin" && (
                        <li className={styles.cta}>
                            <Button to="/admin" variant="button--blue">
                                Zona Admin
                            </Button>
                        </li>
                    )}

                    {loading && (
                        <li>
                            <Loading message="Comprovant usuari…" />
                        </li>
                    )}

                    {!loading && !user && (
                        <li className={styles.cta}>
                            <Button to="/login" variant="button--purple">
                                Inicia sessió
                            </Button>
                        </li>
                    )}

                    {!loading && user && (
                        <li className={styles.userMenu}>
                            <details ref={detailsRef}>
                                <summary aria-label="Obrir menú d'usuari">
                                    <img
                                        src={UserIcon}
                                        alt="Menú d'usuari"
                                        className={styles.userIcon}
                                    />
                                </summary>
                                <ul>
                                    <li>
                                        <Link to="/user">El meu perfil</Link>
                                    </li>
                                    {userData?.role === "user" && (
                                        <li>
                                            <Link to="/user/test">Test</Link>
                                        </li>
                                    )}
                                    <li>
                                        <Button
                                            onClick={logout}
                                            disabled={loggingOut}
                                        >
                                            {loggingOut
                                                ? "Tancant…"
                                                : "Tanca sessió"}
                                        </Button>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    )}
                </ul>

                <Hamburger />
            </div>
        </nav>
    );
};
