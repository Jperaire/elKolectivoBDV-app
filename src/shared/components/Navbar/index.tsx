import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/images/logos/main-logo.png";
import { Button, HamburgerMenu } from "../";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { signOutUser } from "../../../features/auth/firebase/methods";
import { UserIcon } from "../../../assets/images";
import { BASE_LINKS } from "./navLinks";

export const Navbar = () => {
    const { user, userData, loading } = useAuth();

    const handleLogout = async () => {
        await signOutUser();
    };

    return (
        <nav className={styles.navbar} aria-label="Primary">
            <div className={styles.navbarContent}>
                <Link to="/" className={styles.logoWrapper}>
                    <img
                        src={logo}
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
                            <Button
                                to="/admin"
                                size="small"
                                variant="button--blue"
                            >
                                Zona Admin
                            </Button>
                        </li>
                    )}

                    {!loading && !user && (
                        <li className={styles.cta}>
                            <Button
                                to="/login"
                                size="small"
                                variant="button--pink"
                            >
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
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                        >
                                            Tanca sessió
                                        </button>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    )}
                </ul>

                {/* Mobile */}
                <HamburgerMenu />
            </div>
        </nav>
    );
};
