import { useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks";
import { Button, Card, DatePill } from "@/shared/components";
import { normalizeDate, isPast } from "@/shared/utils";
import { ActivityProps } from "@/features/activities/types";
import {
    getMapHref,
    isActivityFull,
} from "@/features/activities/utils/activity";

import { CapacityBadge } from "../CapacityBadge";

import styles from "./Activity.module.css";
import { downloadICS, getGoogleCalendarUrl } from "@/features/activities/utils";

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

    const start = normalizeDate(date);
    const past = isPast(start);
    const isFull = isActivityFull(capacity, attendeesCount);
    const mapHref = getMapHref(location);

    return (
        <Card className={`${styles.card} ${past ? styles.past : ""}`}>
            <article className={styles.activity}>
                <div className={styles.content}>
                    {posterUrl && (
                        <img
                            src={posterUrl}
                            alt={`Poster de l'activitat ${title}`}
                            className={styles.poster}
                            loading="lazy"
                            decoding="async"
                        />
                    )}

                    <div className={styles.column}>
                        <DatePill date={start} />

                        <h2 className={styles.title}>{title}</h2>

                        {description && <p>{description}</p>}
                    </div>
                </div>

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
                            className={styles.fourth}
                            disabled={isFull}
                            title={isFull ? "Aforament complet" : undefined}
                            onClick={handleSignupClick}
                        >
                            Inscriu-t’hi
                        </Button>
                    )}
                    <Button
                        className={styles.ghost}
                        onClick={() =>
                            window.open(
                                getGoogleCalendarUrl(title, start, location),
                                "_blank"
                            )
                        }
                    >
                        Google Calendar
                    </Button>

                    <Button
                        className={styles.secondary}
                        onClick={() => downloadICS(title, start, location)}
                    >
                        ICS
                    </Button>

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
