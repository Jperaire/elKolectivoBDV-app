import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/images/logos/main-logo.png";
import { LinkButton, HamburgerMenu } from "../";

type Variant = "public" | "private" | "admin";
type LinkItem = { label: string; path: string };

interface NavbarProps {
    variant: Variant;
    links: ReadonlyArray<LinkItem>;
}

export const Navbar = ({ variant, links }: NavbarProps) => {
    return (
        <nav className={`${styles.navbar} ${styles[variant]}`}>
            <Link to="/" className={styles.logoWrapper}>
                <img src={logo} alt="Kolectivo BDV" className={styles.logo} />
            </Link>

            <ul className={styles.navLinks}>
                {links.map((link) => (
                    <li key={link.path}>
                        <Link to={link.path}>{link.label}</Link>
                    </li>
                ))}
                <li className={styles.cta}>
                    <LinkButton to="/login" size="small" variant="button--pink">
                        Inicia sessió
                    </LinkButton>
                </li>
            </ul>

            <HamburgerMenu links={links} />
        </nav>
    );
};
