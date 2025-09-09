import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FilterByYear, Loading } from "@/shared/components";
import { useYearFilter } from "@/shared/hooks";

import { NewsProps } from "../../types";
import { getNewsOnce } from "../../firebase/methods";
import { News } from "./components";

import styles from "./NewsList.module.css";

export const NewsList = () => {
    const [items, setItems] = useState<Array<{ id: string; data: NewsProps }>>(
        []
    );

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const news = await getNewsOnce();
                setItems(news);
            } catch (err) {
                console.error("Error cargando noticias:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const { year, setYear, filtered } = useYearFilter(items, 2025);

    return (
        <div className="page">
            <h1>Noticies</h1>

            <FilterByYear selected={year} onSelect={setYear} />

            <section className={styles.NewsList}>
                {loading && <Loading message="Carregant notícies…" />}
                {!loading && items.length === 0 && <p>No hi ha notícies.</p>}
                {!loading &&
                    filtered.map((item) => (
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
