import { useState } from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
    const [formContactData, setFormContactData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormContactData({
            ...formContactData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data:", formContactData);
        alert("Missatge enviat! Ens posarem en contacte aviat.");
        setFormContactData({ name: "", email: "", message: "" });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.contactInfo}>
                    <h3>El Kolectivo BDV</h3>
                    <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:elkolectivobdv@gmail.com">
                            elkolectivobdv@gmail.com
                        </a>
                    </p>
                    <p>
                        <strong>Instagram:</strong>{" "}
                        <a
                            href="https://www.instagram.com/elkolectivobdv/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @elkolectivobdv
                        </a>
                    </p>
                    <p>
                        <strong>Adreça:</strong> Barberà del Vallès, Barcelona
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <h4>Contacta amb nosaltres</h4>
                    <p>
                        Ets una entitat i tens una proposta d'activitat? Tens
                        qualsevol dubte o suggeriment? Ens encantaria
                        escoltar-te!
                    </p>
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom"
                        value={formContactData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correu electrònic"
                        value={formContactData.email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="missatge"
                        placeholder="Missatge"
                        value={formContactData.message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Enviar</button>
                </form>
            </div>

            <div className={styles.copy}>
                &copy; {new Date().getFullYear()} El Kolectivo BDV - Tots els
                drets reservats
            </div>
        </footer>
    );
};
