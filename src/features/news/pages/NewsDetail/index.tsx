import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { Card, DatePill, Loading } from "@/shared/components";

import { NewsProps } from "../../types";

import styles from "./NewsDetail.module.css";

export const NewsDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [news, setNews] = useState<NewsProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchNews = async () => {
            try {
                const docRef = doc(db, "news", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setNews({
                        title: data.title ?? "",
                        description: data.body ?? "",
                        date: data.createdAt?.toDate() ?? new Date(),
                        imageUrl: data.imageUrl ?? undefined,
                    });
                } else {
                    setNews(null);
                }
            } catch (err) {
                console.error("Error cargando noticia:", err);
                setNews(null);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    if (loading) return <Loading message="Carregant noticia..." />;
    if (!news) return <p>Noticia no trobada.</p>;

    return (
        <>
            <section className="page">
                <Card className={styles.content}>
                    <h2>{news.title}</h2>
                    <DatePill date={news.date} />

                    {news.imageUrl && (
                        <img
                            src={news.imageUrl}
                            alt={news.title}
                            className={styles.newsImg}
                            loading="lazy"
                        />
                    )}

                    {news.description.split("\n\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </Card>
            </section>
        </>
    );
};
