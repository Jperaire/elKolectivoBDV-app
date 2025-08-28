import { useEffect, useState } from "react";
import { Loading } from "@/shared/components/Loading";
import { Activity } from "./components/Activity";
import { getActivitiesOnce } from "../../firebase/methods";
import { ActivityProps } from "../../types";
import styles from "./ActivitiesPage.module.css";

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

            {loading && <Loading message="Carregant activitats…" />}
            {!loading && items.length === 0 && <p>No hi ha activitats.</p>}

            <section className={styles.section}>
                {items.map(({ id, data }) => (
                    <Activity key={id} {...data} />
                ))}
            </section>
        </div>
    );
};
