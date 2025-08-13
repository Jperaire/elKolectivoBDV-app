import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./HamburgerMenu.module.css";
import { CloseIcon, MenuIcon } from "../../../assets/images";
import { ButtonLink, ThemeSwitcher } from "../";

type LinkItem = { label: string; path: string };
interface HamburgerMenuProps {
    links: ReadonlyArray<LinkItem>;
}

export const HamburgerMenu = ({ links }: HamburgerMenuProps) => {
    const [open, setOpen] = useState(false);

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

                <li onClick={() => setOpen(false)}>
                    <ButtonLink to="/login" size="large" variant="third">
                        Inicia sessió
                    </ButtonLink>
                </li>
                <li>
                    <ThemeSwitcher />
                </li>
            </ul>
        </div>
    );
};
