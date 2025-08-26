import { Activity } from "./components/Activity";
import styles from "./ActivitiesPage.module.css";
import { useEffect, useState } from "react";
import { getActivitiesOnce } from "../../firebase/methods";
import { ActivityProps } from "../../types";

export const ActivitiesPage = () => {
    const [items, setItems] = useState<
        Array<{ id: string; data: ActivityProps }>
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const rows = await getActivitiesOnce();
                setItems(rows);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="page">
            <h1>Activitats</h1>

            {loading && <p>Carregant…</p>}
            {!loading && items.length === 0 && <p>No hi ha activitats.</p>}

            <section className={styles.section}>
                {items.map(({ id, data }) => (
                    <Activity key={id} {...data} />
                ))}
            </section>
        </div>
    );
};
