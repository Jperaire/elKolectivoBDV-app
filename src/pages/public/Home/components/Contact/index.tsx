import { ContactData } from "./ContactData";
import { ContactForm } from "./ContactForm";
import { Map } from "../Map";
import styles from "./Contact.module.css";

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
