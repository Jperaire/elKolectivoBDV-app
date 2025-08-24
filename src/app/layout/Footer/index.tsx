import styles from "./Footer.module.css";
import { InstagramIcon, EmailIcon, PodcastIcon } from "../../../assets/images";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.social}>
                    <a
                        href="https://www.instagram.com/elkolectivobdv/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={InstagramIcon} alt="Instagram" />
                    </a>
                    <a href="mailto:elkolectivobdv@gmail.com">
                        <img
                            src={EmailIcon}
                            alt="Email"
                            className={styles.email}
                        />
                    </a>
                    <a
                        href="https://open.spotify.com/show/11U847hmBbZ5Mch5JwbxLI?si=dfa3b5d8ce744fb0"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={PodcastIcon} alt="Podcast" />
                    </a>
                </div>
                <p className={styles.copy}>
                    &copy; {new Date().getFullYear()} El Kolectivo BDV
                </p>
            </div>
        </footer>
    );
};
