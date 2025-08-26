import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { signOutUser } from "@/features/auth/firebase/methods";

import { BASE_LINKS } from "./navLinks";

import { UserIcon } from "@/assets/images";
import { MainLogo } from "@/assets/images/index";
import { Button } from "@/shared/components";
import { Hamburger } from "./Hamburger";

import styles from "./Navbar.module.css";

export const Navbar = () => {
    const { user, userData, loading } = useAuth();
    const [signingOut, setSigningOut] = useState(false);

    const handleLogout = async () => {
        try {
            setSigningOut(true);
            await signOutUser();
        } finally {
            setSigningOut(false);
        }
    };

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

                {/* Desktop links */}
                <ul className={styles.navLinks}>
                    {BASE_LINKS.map((l) => (
                        <li key={l.path}>
                            <NavLink to={l.path}>{l.label}</NavLink>
                        </li>
                    ))}

                    {userData?.role === "admin" && (
                        <li>
                            <Button to="/admin" variant="button--blue">
                                Zona Admin
                            </Button>
                        </li>
                    )}

                    {!loading && !user && (
                        <li className={styles.cta}>
                            <Button to="/login" variant="button--pink">
                                Inicia sessió
                            </Button>
                        </li>
                    )}

                    {!loading && user && (
                        <li className={styles.userMenu}>
                            <details>
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
                                            onClick={handleLogout}
                                            isLoading={signingOut}
                                            loadingText="Tancant…"
                                        >
                                            Tanca sessió
                                        </Button>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    )}
                </ul>

                {/* Mobile */}
                <Hamburger />
            </div>
        </nav>
    );
};
