import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { News } from "./components";
import styles from "./NewsPage.module.css";
import { Loading } from "@/shared/components";
import { NewsProps } from "../../types";
import { getNewsOnce } from "../../firebase/methods";

export const NewsPage = () => {
    const [newsList, setNewsList] = useState<
        Array<{ id: string; data: NewsProps }>
    >([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const news = await getNewsOnce();
                setNewsList(news);
            } catch (err) {
                console.error("Error cargando noticias:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="page">
            <h1>Noticies</h1>

            <section className={styles.newsPage}>
                {newsList.map((item) => (
                    <News
                        key={item.id}
                        title={item.data.title}
                        description={item.data.description}
                        date={item.data.date}
                        imageUrl={item.data.imageUrl}
                        onReadMore={() => navigate(`/news/${item.id}`)}
                    />
                ))}
            </section>
        </div>
    );
};
