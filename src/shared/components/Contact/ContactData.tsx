import styles from "./ContactData.module.css";
import { InstagramIcon, EmailIcon, PodcastIcon } from "../../../assets/images";

export const ContactData = () => {
    return (
        <div className={styles.social}>
            <a
                href="https://www.instagram.com/elkolectivobdv/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={InstagramIcon} alt="Instagram" />
                <p> @elKolectivoBDV</p>
            </a>
            <a href="mailto:elkolectivobdv@gmail.com">
                <img src={EmailIcon} alt="Email" className={styles.email} />
                <p>elkolectivobdv@gmail.com</p>
            </a>
            <a
                href="https://open.spotify.com/show/11U847hmBbZ5Mch5JwbxLI?si=dfa3b5d8ce744fb0"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={PodcastIcon} alt="Podcast" />
                <p>Segueix-nos a Spotify</p>
            </a>
        </div>
    );
};
