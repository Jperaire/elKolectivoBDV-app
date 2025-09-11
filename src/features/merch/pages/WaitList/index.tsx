import { useEffect, useState } from "react";

import { BackButton, Loading } from "@/shared/components";

import { getAllWaitlist } from "../../services/waitlist-service";
import { WaitlistEntry } from "../../types";

import styles from "./WaitList.module.css";

export const Waitlist = () => {
    const [entries, setEntries] = useState<WaitlistEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const all = await getAllWaitlist();
                setEntries(all);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <Loading message="Carregant llista d’espera…" />;

    return (
        <div className="page">
            <h1 className="h1">Llista d’espera (Merch)</h1>
            <p className="subtitle">Consulta la llista d’espera.</p>

            <section
                aria-labelledby="waitlist-title"
                className={styles.section}
            >
                {entries.length === 0 ? (
                    <p>No hi ha ningú apuntat encara.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Producte</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>€</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((e) => (
                                <tr key={e.uid + e.itemId}>
                                    <td>{e.itemTitle}</td>
                                    <td>{e.name || "—"}</td>
                                    <td>{e.email}</td>
                                    <td>{e.price} €</td>
                                    <td>
                                        {e.createdAt?.toLocaleDateString() ||
                                            "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <BackButton to="/admin" />
            </section>
        </div>
    );
};
