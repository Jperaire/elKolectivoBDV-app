import { useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks";
import { Button, Card } from "@/shared/components";
import { formatDateLabel, isPast } from "@/shared/utils";
import { ActivityProps } from "@/features/activities/types";

import { CapacityBadge } from "../CapacityBadge";

import styles from "./Activity.module.css";

export const Activity = ({
    title,
    description = "",
    date,
    location,
    capacity,
    attendeesCount = 0,
    requiresSignup = false,
    posterUrl,
    instagramUrl,
}: ActivityProps) => {
    const navigate = useNavigate();

    const { user } = useAuth();

    const handleSignupClick = () => {
        if (!user) {
            navigate(`/login`);
            return;
        }
        // TODO: implementar inscripción real (cuando toque)
    };

    const start = typeof date === "string" ? new Date(date) : date;
    const dateLabel = formatDateLabel(start);
    const past = isPast(start);

    const isFull =
        Number.isFinite(capacity) && typeof capacity === "number"
            ? attendeesCount >= capacity
            : false;

    const mapHref = location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
          )}`
        : undefined;

    return (
        <Card className={`${styles.card} ${past ? styles.past : ""}`}>
            <article className={styles.activity}>
                {posterUrl && (
                    <img
                        src={posterUrl}
                        alt={`Poster de l'activitat ${title}`}
                        className={styles.poster}
                        loading="lazy"
                        decoding="async"
                    />
                )}
                <p className={styles.datePill}>{dateLabel}</p>
                <h2>{title}</h2>
                {description && <p>{description}</p>}

                <div className={styles.meta}>
                    {location && (
                        <a
                            href={mapHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.locationLink}
                            aria-label={`Obrir ubicació a Google Maps: ${location}`}
                        >
                            {location}
                        </a>
                    )}
                    <CapacityBadge
                        capacity={capacity}
                        attendeesCount={attendeesCount}
                    />
                    {!requiresSignup && (
                        <span
                            className={styles.signupReq}
                            aria-label="Aquesta activitat no requereix inscripció"
                        >
                            No requereix inscripció
                        </span>
                    )}
                </div>

                <div className={styles.actions}>
                    {requiresSignup && !past && (
                        <Button
                            className={styles.primary}
                            disabled={isFull}
                            title={isFull ? "Aforament complet" : undefined}
                            onClick={handleSignupClick}
                        >
                            Inscriu-t’hi
                        </Button>
                    )}
                    <Button className={styles.ghost}>Google Calendar</Button>
                    <Button className={styles.secondary}>ICS</Button>
                    {instagramUrl && (
                        <Button
                            className={styles.third}
                            onClick={() =>
                                window.open(
                                    instagramUrl,
                                    "_blank",
                                    "noopener,noreferrer"
                                )
                            }
                            aria-label="Obrir publicació a Instagram"
                        >
                            Saber més
                        </Button>
                    )}
                </div>
            </article>
        </Card>
    );
};
// TODO: CREAR FUNCION EN UTILS PARA CREAR google calendar y ICS
