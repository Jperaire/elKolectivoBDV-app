import { useEffect, useState } from "react";

import { Loading, FilterByYear } from "@/shared/components";

import { Activity } from "./components/Activity";
import { getActivitiesOnce } from "../../firebase/methods";
import { ActivityProps } from "../../types";

import styles from "./ActivitiesPage.module.css";

export const ActivitiesPage = () => {
    const [items, setItems] = useState<
        Array<{ id: string; data: ActivityProps }>
    >([]);
    const [loading, setLoading] = useState(true);
    const [year, setYear] = useState<number>(2025);

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

    const filtered = year
        ? items.filter(({ data }) =>
              typeof data.date === "string"
                  ? data.date.startsWith(year.toString())
                  : data.date instanceof Date &&
                    data.date.getFullYear() === year
          )
        : items;

    return (
        <div className="page">
            <h1>Activitats</h1>

            <FilterByYear selected={year} onSelect={setYear} />

            {loading && <Loading message="Carregant activitats…" />}
            {!loading && items.length === 0 && <p>No hi ha activitats.</p>}

            <section className={styles.section}>
                {filtered.map(({ id, data }) => (
                    <Activity key={id} {...data} />
                ))}
            </section>
        </div>
    );
};
