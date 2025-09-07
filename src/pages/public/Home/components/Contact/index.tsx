import { ContactData } from "./ContactData";
import { ContactForm } from "./ContactForm";
import { Map } from "../Map";
import styles from "./Contact.module.css";

export const Contact = () => {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.formCol}>
                <ContactForm />
            </div>

            <div className={styles.mapImg}>
                <ContactData />
                <Map />
            </div>
        </div>
    );
};
