import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import ThemeSwitcher from "../ThemeSwitcher";
import logo from "../../../assets/images/logos/main-logo.png";
import { ButtonLink } from "../ButtonLink";

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
            <ul className={styles.links}>
                {links.map((link) => (
                    <li key={link.path}>
                        <Link to={link.path}>{link.label}</Link>
                    </li>
                ))}
            </ul>
            <div className={styles.actions}>
                <ThemeSwitcher />
                <ButtonLink to="/login" size="small">
                    Inicia sessió
                </ButtonLink>
            </div>
        </nav>
    );
};
