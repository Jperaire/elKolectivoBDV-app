import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/images/logos/main-logo.png";
import { Button, HamburgerMenu } from "../";

type LinkItem = { label: string; path: string };

interface NavbarProps {
    links: ReadonlyArray<LinkItem>;
}

export const Navbar = ({ links }: NavbarProps) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContent}>
                <Link to="/" className={styles.logoWrapper}>
                    <img
                        src={logo}
                        alt="Kolectivo BDV"
                        className={styles.logo}
                    />
                </Link>
                <ul className={styles.navLinks}>
                    {links.map((link) => (
                        <li key={link.path}>
                            <Link to={link.path}>{link.label}</Link>
                        </li>
                    ))}
                    <li className={styles.cta}>
                        <Button to="/login" size="small" variant="button--pink">
                            Inicia sessió
                        </Button>
                    </li>
                </ul>
                <HamburgerMenu links={links} />
            </div>
        </nav>
    );
};
