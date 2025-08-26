import { Card, Copy } from "@/shared/components";
import type { LinkCardProps } from "../../utils/types";

import styles from "./LinkCard.module.css";

export const LinkCard = ({ resource }: LinkCardProps) => {
    return (
        <Card>
            <article className={styles.cardWrapper}>
                <div className={styles.mainContainer}>
                    <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.imgLink}
                        aria-label={`Obrir ${resource.title} en una pestanya nova`}
                        title={`Obrir ${resource.title}`}
                    >
                        <img src={resource.icon} alt={resource.title} />
                    </a>
                    <h2>{resource.title}</h2>
                </div>

                <div
                    className={styles.copyWrapper}
                    role="group"
                    aria-label="Opciones de copiado"
                >
                    <Copy value={resource.link} />

                    {resource.linksExtra?.ical && (
                        <div className={styles.copyItem}>
                            <p className={styles.copyLabel}>Apple:</p>
                            <Copy value={resource.linksExtra.ical} />
                        </div>
                    )}
                </div>
            </article>
        </Card>
    );
};
