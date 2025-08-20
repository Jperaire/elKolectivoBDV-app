import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HamburgerMenu.module.css";
import { CloseIcon, MenuIcon } from "../../../assets/images";
import { Button, LinkButton } from "../";
import { AuthContext } from "../../../features/auth/context/AuthContext";
import { signOutUser } from "../../../features/auth/firebase/methods";
import { ThemeSwitcher } from "../../../features/theme/components/ThemeSwitcher";

type LinkItem = { label: string; path: string };
interface HamburgerMenuProps {
    links: ReadonlyArray<LinkItem>;
}

export const HamburgerMenu = ({ links }: HamburgerMenuProps) => {
    const [open, setOpen] = useState(false);
    const { user, loading } = useContext(AuthContext);
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

    return (
        <div className={styles.hamburgerMenu}>
            {!open && (
                <button
                    className={styles.burger}
                    onClick={() => setOpen(true)}
                    aria-label="Abrir menú"
                >
                    <img src={MenuIcon} alt="" />
                </button>
            )}

            <ul className={`${styles.menuLinks} ${open ? styles.open : ""} `}>
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
                        <LinkButton to="/login" size="large" variant="third">
                            Inicia sessió
                        </LinkButton>
                    </li>
                )}

                {!loading && user && (
                    <li>
                        <Button
                            type="button"
                            onClick={handleLogout}
                            isLoading={signingOut}
                            loadingText="Tancant..."
                            variant="third"
                            size="large"
                        >
                            Tanca la sessió
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
