import { Button, Card, DatePill } from "@/shared/components";
import { NewsProps } from "@/features/news/types";

import styles from "./News.module.css";

export const News = ({
    title,
    subtitle,
    description,
    date,
    imageUrl,
    onReadMore,
}: NewsProps) => {
    const summary =
        description.length > 150
            ? description.slice(0, 150) + "..."
            : description;

    return (
        <Card className={styles.card}>
            <DatePill date={date} />
            <article className={styles.news}>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={`Imagen de la noticia: ${title}`}
                        className={styles.newsImage}
                        loading="lazy"
                        decoding="async"
                    />
                )}

                <div className={styles.column}>
                    <h2 className={styles.title}>{title}</h2>
                    <h3 className={styles.subtitle}>{subtitle}</h3>
                    <p>{summary}</p>
                    {onReadMore && (
                        <Button className={styles.primary} onClick={onReadMore}>
                            Saber més
                        </Button>
                    )}
                </div>
            </article>
        </Card>
    );
};
