import { useEffect, useState } from "react";
import { Loading, Button, BackButton } from "@/shared/components";
import {
    getActivitiesOnce,
    deleteActivity,
} from "@/features/activities/firebase/methods";
import { ActivityProps } from "@/features/activities/types";
import {
    EditActivityModal,
    CreateActivityModal,
    AttendeesModal,
} from "./components";
import { DeleteIcon, EditIcon } from "@/assets/images";
import { useConfirm } from "@/shared/hooks/useConfirm";

import styles from "./ActivitiesManager.module.css";
import { CapacityBadge } from "../Activities/components/CapacityBadge";

type Row = { id: string; data: ActivityProps };

export const ActivitiesManager = () => {
    const [activities, setActivities] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Row | null>(null);
    const [creating, setCreating] = useState(false);
    const [viewing, setViewing] = useState<{
        id: string;
        title: string;
    } | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const { confirm } = useConfirm(
        "Segur que vols eliminar aquesta activitat?"
    );

    useEffect(() => {
        (async () => {
            try {
                const rows = await getActivitiesOnce();
                setActivities(rows);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (id: string, title?: string) => {
        if (!confirm(title ? `Eliminar activitat “${title}”?` : undefined))
            return;
        try {
            setDeletingId(id);
            await deleteActivity(id);
            setActivities((prev) => prev.filter((a) => a.id !== id));
        } catch (err) {
            console.error("Error eliminant activitat:", err);
            alert("No s'ha pogut eliminar.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleUpdated = (id: string, newData: ActivityProps) => {
        setActivities((prev) =>
            prev.map((a) => (a.id === id ? { id, data: newData } : a))
        );
    };

    const handleCreated = (newRow: Row) => {
        setActivities((prev) => [newRow, ...prev]);
    };

    if (loading) return <Loading message="Carregant activitats…" />;

    return (
        <div className="page">
            <h1 className="h1">Crea, edita i elimina activitats</h1>

            <section className={styles.content}>
                <Button
                    onClick={() => setCreating(true)}
                    variant="button--pink"
                    className={styles.createBtn}
                >
                    + Afegir activitat
                </Button>

                {activities.length === 0 ? (
                    <p>No hi ha activitats.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Títol</th>
                                <th>Data</th>
                                <th>Ubicació</th>
                                <th>Inscrits</th>
                                <th>Accions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(({ id, data }) => {
                                const count =
                                    Number.isFinite(data.attendeesCount) &&
                                    (data.attendeesCount as number) > 0
                                        ? (data.attendeesCount as number)
                                        : Array.isArray(data.attendees)
                                        ? data.attendees!.length
                                        : 0;

                                return (
                                    <tr key={id}>
                                        <td>{data.title}</td>
                                        <td>
                                            {data.date instanceof Date
                                                ? data.date.toLocaleDateString(
                                                      "ca-ES",
                                                      {
                                                          day: "2-digit",
                                                          month: "2-digit",
                                                          year: "numeric",
                                                      }
                                                  )
                                                : String(data.date)}
                                        </td>
                                        <td>{data.location}</td>
                                        <td>
                                            <div
                                                className={styles.enrolledCell}
                                            >
                                                {data.requiresSignup ? (
                                                    <button
                                                        type="button"
                                                        className={
                                                            styles.badgeButton
                                                        }
                                                        onClick={() =>
                                                            setViewing({
                                                                id,
                                                                title: data.title,
                                                            })
                                                        }
                                                        aria-label={`Veure inscrits de ${data.title}`}
                                                        title="Veure inscrits"
                                                    >
                                                        <CapacityBadge
                                                            capacity={
                                                                data.capacity
                                                            }
                                                            attendeesCount={
                                                                count
                                                            }
                                                            className={
                                                                styles.enrolledCount
                                                            }
                                                        />
                                                    </button>
                                                ) : (
                                                    <span
                                                        style={{ opacity: 0.6 }}
                                                    >
                                                        —
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className={styles.actions}>
                                            <button
                                                className={styles.iconBtn}
                                                onClick={() =>
                                                    setEditing({ id, data })
                                                }
                                                aria-label="Editar activitat"
                                                type="button"
                                            >
                                                <img src={EditIcon} alt="" />
                                            </button>
                                            <button
                                                className={styles.iconBtn}
                                                onClick={() =>
                                                    handleDelete(id, data.title)
                                                }
                                                aria-label="Eliminar activitat"
                                                type="button"
                                                disabled={deletingId === id}
                                                title={
                                                    deletingId === id
                                                        ? "Eliminant…"
                                                        : "Eliminar activitat"
                                                }
                                            >
                                                <img src={DeleteIcon} alt="" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}

                <EditActivityModal
                    open={!!editing}
                    activity={editing}
                    onClose={() => setEditing(null)}
                    onUpdated={handleUpdated}
                />

                <CreateActivityModal
                    open={creating}
                    onClose={() => setCreating(false)}
                    onCreated={handleCreated}
                />

                <AttendeesModal
                    open={!!viewing}
                    activityId={viewing?.id || ""}
                    activityTitle={viewing?.title || ""}
                    onClose={() => setViewing(null)}
                    onChanged={async () => {
                        const rows = await getActivitiesOnce();
                        setActivities(rows);
                    }}
                />
            </section>

            <BackButton to="/admin" />
        </div>
    );
};
