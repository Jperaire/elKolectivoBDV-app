import { ContactData } from "./ContactData";
import { ContactForm } from "./ContactForm";

import styles from "./Contact.module.css";
import { Map } from "../Map";

export const Contact = () => {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.firstCol}>
                <ContactData />

                <div className={styles.mapImg}>
                    <Map />
                </div>
            </div>
            <ContactForm />
        </div>
    );
};
