import { useEffect, useState } from "react";
import { Modal, Button, Loading } from "@/shared/components";
import { getAttendees, removeAttendee } from "@/features/activities/services";
import type { ActivityAttendee } from "@/features/activities/types";

type Props = {
    open: boolean;
    activityId: string;
    activityTitle: string;
    onClose: () => void;
    onChanged?: () => void;
};

export const AttendeesModal = ({
    open,
    activityId,
    activityTitle,
    onClose,
    onChanged,
}: Props) => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<ActivityAttendee[]>([]);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (!open || !activityId) return;
        (async () => {
            setLoading(true);
            try {
                const arr = await getAttendees(activityId);
                setList(arr);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [open, activityId]);

    const handleRemove = async (att: ActivityAttendee) => {
        if (
            !window.confirm(
                `Eliminar ${att.name || att.email} d’aquesta activitat?`
            )
        )
            return;
        try {
            setBusy(true);
            await removeAttendee(activityId, att); // arrayRemove con objeto exacto
            setList((prev) => prev.filter((a) => a.uid !== att.uid));
            onChanged?.();
        } catch (e) {
            console.error(e);
            alert("No s’ha pogut eliminar.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose} titleId="attendees-title">
            <h2 id="attendees-title" style={{ marginBottom: "0.5rem" }}>
                Inscrits — {activityTitle}
            </h2>

            {loading ? (
                <Loading message="Carregant inscrits…" />
            ) : list.length === 0 ? (
                <p>No hi ha inscrits.</p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left" }}>Nom</th>
                                <th style={{ textAlign: "left" }}>Email</th>
                                <th style={{ textAlign: "left" }}>Accions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((a) => (
                                <tr key={a.uid}>
                                    <td>{a.name || "—"}</td>
                                    <td>{a.email}</td>
                                    <td>
                                        <Button
                                            variant="button--gray"
                                            onClick={() => handleRemove(a)}
                                            disabled={busy}
                                            title="Eliminar d’aquesta activitat"
                                        >
                                            Elimina
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "0.5rem",
                    marginTop: "1rem",
                }}
            >
                <Button variant="button--secondary" onClick={onClose}>
                    Tancar
                </Button>
            </div>
        </Modal>
    );
};
