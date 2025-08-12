import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/images/logos/main-logo.png";
import { ButtonLink } from "../ButtonLink";
import { HamburgerMenu } from "../HamburgerMenu";

type Variant = "public" | "private" | "admin";
type LinkItem = { label: string; path: string };

interface NavbarProps {
    variant: Variant;
    links: ReadonlyArray<LinkItem>;
}

export const Navbar = ({ variant, links }: NavbarProps) => {
    return (
        <nav className={`${styles.navbar} ${styles[variant]}`}>
            {/* Logo */}
            <Link to="/" className={styles.logoWrapper}>
                <img src={logo} alt="Kolectivo BDV" className={styles.logo} />
            </Link>

            {/* Desktop links */}
            <ul className={styles.navLinks}>
                {links.map((link) => (
                    <li key={link.path}>
                        <Link to={link.path}>{link.label}</Link>
                    </li>
                ))}
                <li className={styles.cta}>
                    <ButtonLink to="/login" size="small" variant="third">
                        Inicia sessió
                    </ButtonLink>
                </li>
            </ul>

            {/* Mobile menu */}
            <HamburgerMenu links={links} />
        </nav>
    );
};
