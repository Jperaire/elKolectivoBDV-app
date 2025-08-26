import { Button, Card } from "../../../../../../shared/components";
import { CapacityBadge } from "../CapacityBadge";

import styles from "./Activity.module.css";

export const Activity = () => {
    const title = "Nom activitat";
    const description =
        "Descripció breu de l’activitat amb 1–2 frases perquè quedi net i clar.";
    const dateLabel = "6 d'Octubre · 18:30h";
    const location = "Ateneu de Barberà";

    const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
    )}`;

    const capacity = 30;
    const attendeesCount = 28;
    const isFull = Number.isFinite(capacity) && attendeesCount >= capacity;

    return (
        <Card className={styles.card}>
            <article className={styles.activity}>
                <p className={styles.datePill}>{dateLabel}</p>
                <h2>{title}</h2>
                <p className={styles.desc}>{description}</p>

                <div className={styles.meta}>
                    <a
                        href={mapHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.locationLink}
                        aria-label={`Obrir ubicació a Google Maps: ${location}`}
                        title="Obrir a Google Maps"
                    >
                        {location}
                    </a>

                    <span className={styles.type}>Taller</span>

                    <CapacityBadge
                        capacity={capacity}
                        attendeesCount={attendeesCount}
                    />
                </div>

                <div className={styles.actions}>
                    <Button
                        className={styles.primary}
                        disabled={isFull}
                        title={isFull ? "Aforament complet" : undefined}
                    >
                        Inscriu-t’hi
                    </Button>
                    <Button className={styles.ghost}>Google Calendar</Button>
                    <Button className={styles.secondary}>ICS</Button>
                </div>
            </article>
        </Card>
    );
};
