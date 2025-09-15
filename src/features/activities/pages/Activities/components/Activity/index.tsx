import { useEffect, useMemo, useState } from "react";
import { Button, Card, DatePill, Modal } from "@/shared/components";
import { normalizeDate, isPast } from "@/shared/utils";
import { ActivityAttendee, ActivityProps } from "@/features/activities/types";
import {
    downloadICS,
    getGoogleCalendarUrl,
    getMapHref,
    isActivityFull,
} from "@/features/activities/utils";
import { CapacityBadge } from "../CapacityBadge";

import { useAuth } from "@/features/auth/hooks";
import {
    addAttendee,
    removeAttendee,
    isUserAttending,
} from "@/features/activities/services";

import styles from "./Activity.module.css";

type ActivityCardProps = ActivityProps & { id: string };

export const Activity = ({
    id,
    title,
    description = "",
    date,
    location,
    capacity,
    attendeesCount = 0,
    requiresSignup = false,
    posterUrl,
    instagramUrl,
}: ActivityCardProps) => {
    const start = normalizeDate(date);
    const past = isPast(start);
    const isFull = isActivityFull(capacity, attendeesCount);
    const mapHref = getMapHref(location);

    const { user } = useAuth();
    const [signed, setSigned] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        (async () => {
            if (!user) {
                setSigned(false);
                return;
            }
            const ok = await isUserAttending(id, user.uid);
            setSigned(ok);
        })();
    }, [user, id]);

    const attendee: ActivityAttendee | null = useMemo(() => {
        if (!user) return null;
        return {
            uid: user.uid,
            email: user.email || "sense-email",
            name: user.displayName || "",
        };
    }, [user]);

    const handleToggleSignup = async () => {
        if (!user || !attendee) {
            setShowLogin(true);
            return;
        }
        try {
            if (signed) {
                await removeAttendee(id, attendee);
                setSigned(false);
                alert(`❌ T’has desapuntat de “${title}”.`);
            } else {
                await addAttendee(id, attendee);
                setSigned(true);
                alert(`✅ T’has inscrit a “${title}”.`);
            }
        } catch (e) {
            console.error(e);
            alert("Error, torna-ho a provar.");
        }
    };

    return (
        <Card className={`${styles.card} ${past ? styles.past : ""}`}>
            <article className={styles.activity}>
                <DatePill date={start} />
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
                        <h2 className={styles.title}>{title}</h2>
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
                    </div>
                </div>

                <div className={styles.actions}>
                    {requiresSignup && !past && (
                        <Button
                            className={styles.fourth}
                            onClick={handleToggleSignup}
                            disabled={isFull && !signed}
                            title={
                                isFull && !signed
                                    ? "Aforament complet"
                                    : undefined
                            }
                        >
                            {signed ? "Desapuntar-me" : "Inscriu-t’hi"}
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
                        Google Cal
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

            <Modal
                open={showLogin}
                onClose={() => setShowLogin(false)}
                titleId="login-modal-title"
            >
                <h3 id="login-modal-title">Inicia sessió per inscriure’t</h3>
                <p>
                    Has d’<strong>iniciar sessió</strong> per inscriure’t a “
                    {title}”.
                </p>
                <div className={styles.modalActions}>
                    <Button to="/login" variant="button--blue">
                        Inicia sessió
                    </Button>
                    <Button
                        type="button"
                        variant="button--gray"
                        onClick={() => setShowLogin(false)}
                    >
                        Cancel·la
                    </Button>
                </div>
            </Modal>
        </Card>
    );
};
