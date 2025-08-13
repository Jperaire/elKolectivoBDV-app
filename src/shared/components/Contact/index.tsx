import { ContactData } from "./ContactData";
import { ContactForm } from "./ContactForm";

import styles from "./Contact.module.css";
import { FakeImg } from "../../../assets/images";

export const Contact = () => {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.firstCol}>
                <ContactData />
                <img src={FakeImg} alt="map" className={styles.mapImg} />
            </div>
            <ContactForm />
        </div>
    );
};
