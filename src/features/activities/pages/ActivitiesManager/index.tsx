import { useEffect, useState } from "react";
import { Modal, Button, Loading } from "@/shared/components";
import { getAttendees, removeAttendee } from "@/features/activities/services";
import type { ActivityAttendee } from "@/features/activities/types";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { Trash } from "lucide-react"; // icono de borrar
import styles from "./AttendeesModal.module.css";

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
    const { confirm } = useConfirm();

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
        const ok = confirm(
            `Eliminar ${att.name || att.email} d’aquesta activitat?`
        );
        if (!ok) return;

        try {
            setBusy(true);
            await removeAttendee(activityId, att);
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
            <h2 id="attendees-title" className={styles.title}>
                Inscrits — {activityTitle}
            </h2>

            {loading ? (
                <Loading message="Carregant inscrits…" />
            ) : list.length === 0 ? (
                <p className={styles.empty}>No hi ha inscrits.</p>
            ) : (
                <ul className={styles.list}>
                    {list.map((a) => (
                        <li key={a.uid} className={styles.item}>
                            <div className={styles.info}>
                                <span className={styles.name}>
                                    {a.name || "—"}
                                </span>
                                <span className={styles.email}>{a.email}</span>
                            </div>
                            <button
                                className={styles.deleteBtn}
                                onClick={() => handleRemove(a)}
                                disabled={busy}
                                aria-label={`Eliminar ${a.name || a.email}`}
                                title="Eliminar d’aquesta activitat"
                            >
                                <Trash size={18} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div className={styles.actions}>
                <Button variant="button--secondary" onClick={onClose}>
                    Tancar
                </Button>
            </div>
        </Modal>
    );
};
