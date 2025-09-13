import { useEffect, useState } from "react";

import { Loading, FilterByYear } from "@/shared/components";
import { useYearFilter } from "@/shared/hooks";

import { Activity } from "./components/Activity";
import { getActivitiesOnce } from "../../firebase/methods";
import { ActivityProps } from "../../types";

import styles from "./Activities.module.css";

export const Activities = () => {
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

    const { year, setYear, filtered } = useYearFilter(items, 2025);

    return (
        <div className="page">
            <h1 className="h1">
                Activitats
                <FilterByYear selected={year} onSelect={setYear} />
            </h1>

            {loading && <Loading message="Carregant activitats…" />}
            {!loading && items.length === 0 && <p>No hi ha activitats.</p>}

            <section className={styles.section}>
                {filtered.map(({ id, data }) => (
                    <Activity key={id} id={id} {...data} />
                ))}
            </section>
        </div>
    );
};
