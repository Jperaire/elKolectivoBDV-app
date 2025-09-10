import { useEffect, useState } from "react";
import { Button, Loading, BackButton } from "@/shared/components";
import { CreateNewsModal, EditNewsModal } from "./components";
import styles from "./NewsManager.module.css";
import { EditIcon, DeleteIcon } from "@/assets/images";
import { NewsProps } from "../../types";
import { deleteNews, getNewsOnce } from "../../firebase/methods";

type Row = { id: string; data: NewsProps };

export const NewsManager = () => {
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState<Row | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setRows(await getNewsOnce());
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleCreated = (row: Row) => setRows((prev) => [row, ...prev]);

    const handleUpdated = (id: string, data: NewsProps) =>
        setRows((prev) => prev.map((r) => (r.id === id ? { id, data } : r)));

    const handleDelete = async (id: string) => {
        if (!confirm("Segur que vols eliminar aquesta notícia?")) return;
        try {
            await deleteNews(id);
            setRows((prev) => prev.filter((r) => r.id !== id));
        } catch (e) {
            console.error("Error deleting:", e);
            alert("No s'ha pogut eliminar.");
        }
    };

    if (loading) return <Loading message="Carregant notícies…" />;

    return (
        <div className="page">
            <h1>Crea, edita i elimina noticies</h1>

            <section className={styles.content}>
                <Button
                    onClick={() => setCreating(true)}
                    className={styles.createBtn}
                    variant="button--pink"
                >
                    + Crear notícia
                </Button>
                {rows.length === 0 ? (
                    <p>No hi ha notícies.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Títol</th>
                                <th>Data</th>
                                <th>Accions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(({ id, data }) => (
                                <tr key={id}>
                                    <td>{data.title}</td>
                                    <td>
                                        {data.date.toLocaleDateString("ca-ES", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className={styles.actions}>
                                        <button
                                            type="button"
                                            className={styles.iconBtn}
                                            title="Editar"
                                            aria-label="Editar"
                                            onClick={() =>
                                                setEditing({ id, data })
                                            }
                                        >
                                            <img
                                                src={EditIcon}
                                                alt=""
                                                aria-hidden
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.iconBtn}
                                            title="Eliminar"
                                            aria-label="Eliminar"
                                            onClick={() => handleDelete(id)}
                                        >
                                            <img
                                                src={DeleteIcon}
                                                alt=""
                                                aria-hidden
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <CreateNewsModal
                    open={creating}
                    onClose={() => setCreating(false)}
                    onCreated={handleCreated}
                />
                <EditNewsModal
                    open={!!editing}
                    news={editing}
                    onClose={() => setEditing(null)}
                    onUpdated={handleUpdated}
                />
            </section>

            <BackButton to="/admin" />
        </div>
    );
};
