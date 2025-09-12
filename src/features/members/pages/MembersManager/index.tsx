import { useEffect, useMemo, useState } from "react";
import {
    collection,
    getDocs,
    orderBy,
    query,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { BackButton, Button, Loading } from "@/shared/components";
import { db } from "@/lib/firebase/firestore";

import styles from "./MembersManager.module.css";

type Role = "user" | "admin";
type Member = { id: string; displayName?: string; email?: string; role?: Role };

export const MembersManager = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const load = async () => {
            try {
                const q = query(
                    collection(db, "users"),
                    orderBy("displayName")
                );
                const snap = await getDocs(q);
                const rows: Member[] = snap.docs.map((d) => {
                    const data = d.data() as any;
                    return {
                        id: d.id,
                        displayName: data.displayName ?? "",
                        email: data.email ?? "",
                        role: (data.role as Role) ?? "user",
                    };
                });
                setMembers(rows);
            } catch (e) {
                console.error(e);
                setError("No s'han pogut carregar els membres.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const onChangeRole = async (member: Member, nextRole: Role) => {
        if (member.role === nextRole) return;

        const question =
            nextRole === "admin"
                ? `Segur que vols donar permisos d'ADMIN a “${
                      member.displayName || member.email
                  }”?`
                : `Segur que vols treure permisos d'ADMIN a “${
                      member.displayName || member.email
                  }”?`;
        if (!window.confirm(question)) return;

        setSavingId(member.id);
        setError("");
        try {
            await updateDoc(doc(db, "users", member.id), { role: nextRole });
            setMembers((prev) =>
                prev.map((m) =>
                    m.id === member.id ? { ...m, role: nextRole } : m
                )
            );
        } catch (e: any) {
            console.error(e);
            setError(
                e?.code === "permission-denied"
                    ? "No tens permisos."
                    : "Error actualitzant el rol."
            );
        } finally {
            setSavingId(null);
        }
    };

    const onDeleteUser = async (member: Member) => {
        const name = member.displayName || member.email || member.id;
        if (
            !window.confirm(
                `Eliminar l'usuari “${name}”? Aquesta acció no es pot desfer.`
            )
        )
            return;

        setSavingId(member.id);
        setError("");
        try {
            await deleteDoc(doc(db, "users", member.id));
            setMembers((prev) => prev.filter((m) => m.id !== member.id));
        } catch (e: any) {
            console.error(e);
            setError(
                e?.code === "permission-denied"
                    ? "No tens permisos per eliminar."
                    : "Error eliminant usuari."
            );
        } finally {
            setSavingId(null);
        }
    };

    const hasMembers = useMemo(() => members.length > 0, [members]);
    if (loading) return <Loading message="Carregant membres…" />;

    return (
        <div className="page">
            <h1 className="h1">Membres</h1>
            <p>Visualitza els membres de la comunitat i gestiona els rols.</p>

            {error && (
                <p role="status" aria-live="polite" className={styles.error}>
                    {error}
                </p>
            )}

            <section className={styles.table}>
                {!hasMembers ? (
                    <p>No hi ha membres.</p>
                ) : (
                    <table aria-label="Llistat de membres">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Correu</th>
                                <th>Rol</th>
                                <th className={styles.actionsCol}>Accions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.displayName || "—"}</td>
                                    <td>
                                        {m.email ? (
                                            <a
                                                href={`mailto:${m.email}`}
                                                className={styles.mailLink}
                                            >
                                                {m.email}
                                            </a>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    <td>
                                        <span
                                            className={`${styles.badge} ${
                                                m.role === "admin"
                                                    ? styles.badgeAdmin
                                                    : styles.badgeUser
                                            }`}
                                            aria-label={`Rol actual: ${m.role}`}
                                        >
                                            {m.role}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        {m.role === "admin" ? (
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    onChangeRole(m, "user")
                                                }
                                                disabled={savingId === m.id}
                                                title="Treure rol d'administrador"
                                                className={styles.actionBtn1}
                                            >
                                                {savingId === m.id
                                                    ? "Guardant…"
                                                    : "Fer USER"}
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                onClick={() =>
                                                    onChangeRole(m, "admin")
                                                }
                                                disabled={savingId === m.id}
                                                title="Concedir rol d'administrador"
                                                className={styles.actionBtn2}
                                            >
                                                {savingId === m.id
                                                    ? "Guardant…"
                                                    : "Fer ADMIN"}
                                            </Button>
                                        )}

                                        {/* ✅ Botó eliminar */}
                                        <Button
                                            variant="button--pink"
                                            type="button"
                                            onClick={() => onDeleteUser(m)}
                                            disabled={savingId === m.id}
                                            title="Eliminar usuari (Firestore)"
                                            className={styles.actionBtn3}
                                        >
                                            {savingId === m.id
                                                ? "Eliminant…"
                                                : "Eliminar"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>

            <BackButton to="/admin" />
        </div>
    );
};
