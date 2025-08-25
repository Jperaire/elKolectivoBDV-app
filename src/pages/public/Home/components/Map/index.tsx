import styles from "./Map.module.css";

export const Map = () => {
    return (
        <section aria-label="Ubicació Ateneu de Barberà">
            <div className={styles.mapWrapper}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5974.821098794752!2d2.1243900401022913!3d41.517046871403195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a495db083917c5%3A0x24cb51b20650d50f!2sAteneu%20de%20Barber%C3%A0!5e0!3m2!1ses!2ses!4v1756139829496!5m2!1ses!2ses"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                />
            </div>
        </section>
    );
};
