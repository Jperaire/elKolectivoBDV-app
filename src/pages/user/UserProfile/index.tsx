import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { Card, Button, Loading } from "@/shared/components";
import { deleteAccount, signOutUser } from "@/features/auth/firebase/methods";
import { ThemeSwitcher } from "@/features/theme/components/";
import { updateUser } from "@/shared/services/";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { db } from "@/lib/firebase/firestore";
import { fmtEUR, normalizeDate, isPast } from "@/shared/utils";

import { leaveWaitlist } from "@/features/merch/services/waitlist-service";
import { merchanItems } from "@/features/merch/data/items";
import { FakeImg, CloseRedIcon } from "@/assets/images";

import { getActivitiesOnce } from "@/features/activities/firebase/methods";
import { removeAttendee } from "@/features/activities/services";

import styles from "./UserProfile.module.css";

type MyAct = { id: string; title: string; date: Date; location?: string };

export const UserProfile = () => {
    const { user, userData, loading } = useAuth();

    const [displayName, setDisplayName] = useState(userData?.displayName ?? "");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState<string>("");

    // ====== MERCH WAITLIST ======
    const [waitItems, setWaitItems] = useState<
        { id: string; title: string; price: number; img?: string }[]
    >([]);
    const [loadingWait, setLoadingWait] = useState(false);

    // ====== MY ACTIVITIES (UPCOMING) ======
    const [myActs, setMyActs] = useState<MyAct[]>([]);
    const [loadingActs, setLoadingActs] = useState(false);

    // ---------- helpers ----------
    const run = async (fn: () => Promise<void>) => {
        setStatus("");
        setBusy(true);
        try {
            await fn();
        } catch (err) {
            console.error(err);
            setStatus("❌ S'ha produït un error.");
        } finally {
            setBusy(false);
        }
    };

    const loadWaitlist = async (uid: string) => {
        setLoadingWait(true);
        try {
            const selected: {
                id: string;
                title: string;
                price: number;
                img?: string;
            }[] = [];
            await Promise.all(
                merchanItems.map(async (m) => {
                    const ref = doc(db, "waitlist", `${uid}_${m.id}`);
                    const snap = await getDoc(ref);
                    if (snap.exists()) {
                        selected.push({
                            id: m.id,
                            title: m.title,
                            price: m.price,
                            img: m.img || FakeImg,
                        });
                    }
                })
            );
            setWaitItems(selected);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingWait(false);
        }
    };

    const loadMyActivities = async (uid: string) => {
        setLoadingActs(true);
        try {
            const rows = await getActivitiesOnce(); // [{ id, data }]
            const mine: MyAct[] = rows
                .filter(({ data }) => {
                    const start = normalizeDate(data.date);
                    const iAttend = Array.isArray(data.attendees)
                        ? data.attendees.some((a) => a?.uid === uid)
                        : false;
                    return iAttend && !isPast(start);
                })
                .map(({ id, data }) => ({
                    id,
                    title: data.title,
                    date: normalizeDate(data.date),
                    location: data.location,
                }))
                .sort((a, b) => a.date.getTime() - b.date.getTime());

            setMyActs(mine);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingActs(false);
        }
    };

    // ---------- effects ----------
    useEffect(() => {
        if (!user) return;
        loadWaitlist(user.uid);
    }, [user]);

    useEffect(() => {
        if (!user) {
            setMyActs([]);
            return;
        }
        loadMyActivities(user.uid);
    }, [user]);

    // ---------- handlers ----------
    const onSubmitUpdate: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        run(async () => {
            const next = { displayName: displayName.trim() };
            await updateProfile(user!, next);
            await updateUser(user!.uid, next);
            setStatus("✅ Perfil actualitzat.");
        });
    };

    const onDelete = () => {
        if (!window.confirm("Segur que vols esborrar el compte?")) return;
        run(async () => {
            await deleteAccount(password);
            setStatus("🗑️ Compte esborrat.");
        });
    };

    const onSignOut = () => {
        if (!window.confirm("Segur que vols tancar la sessió?")) return;
        run(async () => {
            await signOutUser();
            setStatus("👋 Sessió tancada.");
        });
    };

    const handleLeave = async (id: string, title: string) => {
        if (!user) return;
        if (
            !window.confirm(
                `Segur que vols treure “${title}” de la llista d’espera?`
            )
        )
            return;

        try {
            await leaveWaitlist(user.uid, id);
            setWaitItems((prev) => prev.filter((x) => x.id !== id));
            setStatus(`❌ Has sortit de la llista d’espera de “${title}”.`);
        } catch (e) {
            console.error(e);
            setStatus("❌ No s'ha pogut actualitzar la llista d'espera.");
        }
    };

    const handleUnsubscribe = async (activityId: string, title: string) => {
        if (!user) return;
        if (!window.confirm(`Vols desapuntar-te d’“${title}”?`)) return;

        try {
            // Construimos el mismo objeto que se añadió con arrayUnion
            const attendee = {
                uid: user.uid,
                email: user.email || "sense-email",
                name: user.displayName || "",
            };
            await removeAttendee(activityId, attendee);
            setMyActs((prev) => prev.filter((x) => x.id !== activityId));
            setStatus(`❌ T’has desapuntat de “${title}”.`);
        } catch (e) {
            console.error(e);
            setStatus("❌ No s’ha pogut desapuntar. Torna-ho a provar.");
        }
    };

    // ---------- guards ----------
    if (loading) return <Loading message="Comprovant sessió…" />;
    if (!user) return <p>No has iniciat sessió.</p>;

    // ---------- render ----------
    return (
        <div className="page">
            <h1 className="h1">El meu perfil</h1>

            <section className={styles.section}>
                {/* feedback d'estat global */}
                <p role="status" aria-live="polite">
                    {status}
                </p>

                {/* Perfil */}
                <Card>
                    <article
                        aria-labelledby="update-title"
                        className={styles.article}
                    >
                        <h2 id="update-title">Actualitza el perfil</h2>
                        <form onSubmit={onSubmitUpdate}>
                            <div>
                                <label htmlFor="displayName">Nom visible</label>
                                <input
                                    id="displayName"
                                    name="displayName"
                                    value={displayName}
                                    onChange={(e) =>
                                        setDisplayName(e.target.value)
                                    }
                                    autoComplete="name"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="button--red"
                                disabled={busy}
                            >
                                {busy ? "Guardant…" : "Desa canvis"}
                            </Button>
                        </form>
                    </article>
                </Card>

                {/* Canviar tema */}
                <Card>
                    <article
                        aria-labelledby="change-theme"
                        className={styles.article}
                    >
                        <h2 id="signout-title">Canviar tema</h2>
                        <div className={styles.switcherWrapper}>
                            <ThemeSwitcher />
                        </div>
                    </article>
                </Card>

                {/* Les meves activitats (pròximes) */}
                <Card>
                    <article
                        aria-labelledby="myacts-title"
                        className={styles.article}
                    >
                        <h2 id="myacts-title">Les meves activitats</h2>

                        {loadingActs ? (
                            <Loading message="Carregant les teves activitats…" />
                        ) : myActs.length === 0 ? (
                            <p>No tens inscripcions pròximes.</p>
                        ) : (
                            <div style={{ overflowX: "auto" }}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Activitat</th>
                                            <th>Data</th>
                                            <th>Ubicació</th>
                                            <th>Accions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myActs.map((r) => (
                                            <tr key={r.id}>
                                                <td>{r.title}</td>
                                                <td>
                                                    {r.date.toLocaleString(
                                                        "ca-ES",
                                                        {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </td>
                                                <td>{r.location || "—"}</td>
                                                <td>
                                                    <Button
                                                        variant="button--gray"
                                                        onClick={() =>
                                                            handleUnsubscribe(
                                                                r.id,
                                                                r.title
                                                            )
                                                        }
                                                        disabled={busy}
                                                    >
                                                        Desapuntar-me
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </article>
                </Card>

                {/* Merchan pendent (waitlist) */}
                <Card>
                    <article
                        aria-labelledby="waitlist-title"
                        className={styles.article}
                    >
                        <h2 id="waitlist-title">Merchan pendent</h2>

                        <p style={{ textAlign: "center" }}>
                            Aquests són els articles que en algún moment et van
                            interessar. Ara ets a la llista d’espera. Quan fem
                            una comanda nova, t’avisarem per correu per
                            assegurar-nos que encara t’interessen i t’indicarem
                            com fer el pagament.
                        </p>

                        {loadingWait ? (
                            <Loading message="Carregant productes…" />
                        ) : waitItems.length === 0 ? (
                            <p>No tens productes a la llista d’espera.</p>
                        ) : (
                            <ul className={styles.waitlist}>
                                {waitItems.map((it) => (
                                    <li key={it.id} className={styles.waitItem}>
                                        <div className={styles.itemInfo}>
                                            <img
                                                src={it.img || FakeImg}
                                                alt={it.title}
                                                className={styles.waitImg}
                                            />
                                            <div className={styles.waitInfo}>
                                                <h3>{it.title}</h3>
                                                <p className={styles.waitPrice}>
                                                    {fmtEUR.format(it.price)}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className={styles.handleLeaveBtn}
                                            onClick={() =>
                                                handleLeave(it.id, it.title)
                                            }
                                            disabled={busy}
                                            title="Eliminar de la meva llista"
                                        >
                                            <img src={CloseRedIcon} alt="" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </article>
                </Card>

                {/* Esborrar compte */}
                <Card>
                    <article
                        aria-labelledby="delete-title"
                        className={styles.article}
                    >
                        <h2 id="delete-title">Esborra el compte</h2>
                        <p style={{ textAlign: "center" }}>
                            Introdueix la teva contrasenya per confirmar.
                        </p>
                        <div className={styles.password}>
                            <label htmlFor="currentPassword">
                                Contrasenya actual:
                            </label>
                            <input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <Button
                            type="button"
                            variant="button--red"
                            onClick={onDelete}
                            disabled={busy}
                        >
                            {busy ? "Esborrant…" : "Esborra el compte"}
                        </Button>
                    </article>
                </Card>

                {/* Tancar sessió */}
                <Card>
                    <article
                        aria-labelledby="signout-title"
                        className={styles.article}
                    >
                        <h2 id="signout-title">Tanca la sessió</h2>
                        <Button
                            type="button"
                            variant="button--red"
                            onClick={onSignOut}
                            disabled={busy}
                        >
                            {busy ? "Tancant…" : "Tanca sessió"}
                        </Button>
                    </article>
                </Card>
            </section>
        </div>
    );
};
