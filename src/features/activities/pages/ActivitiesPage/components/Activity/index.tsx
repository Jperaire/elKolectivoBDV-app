import { Button, Card } from "../../../../../../shared/components";
import styles from "./Activity.module.css";

export const Activity = () => {
    const title = "Nom activitat";
    const description =
        "jhoasjdkflañsjdfklañsjdfk lañsjdfklañsjdfklañsjf kalsñjfdkalsñjdfkalsñjfklañ sjdf";
    const dateLabel = "6 d'Octubre · 18:30h";
    const location = "Ateneu de Barberà";

    const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
    )}`;

    return (
        <Card className={styles.card}>
            <article className={styles.activity}>
                <p className={styles.datePill}>{dateLabel}</p>
                <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.locationLink}
                    aria-label={`Obrir ubicació a Google Maps: ${location}`}
                    title={`Obrir a Google Maps`}
                >
                    📍 {location}
                </a>

                <h2>{title}</h2>
                <p>{description}</p>

                <div className={styles.actions}>
                    <Button className={styles.primary}>Inscriu-t’hi</Button>
                    <Button className={styles.ghost}>Google Calendar</Button>
                    <Button className={styles.secondary}>ICS</Button>
                </div>
            </article>
        </Card>
    );
};
