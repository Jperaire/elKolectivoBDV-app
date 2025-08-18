import { useForm } from "../../hooks/useForm";
import styles from "./ContactForm.module.css";

export const ContactForm = () => {
    const { name, email, message, onInputChange, onResetForm } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, email, message }); //TODO: CONFIGURAR ENVIAR MAIL
        onResetForm();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Nom</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="message">Missatge</label>
                <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={onInputChange}
                    rows={4}
                    required
                />
            </div>

            <button type="submit" className={styles.submitBtn}>
                Enviar
            </button>
        </form>
    );
};
