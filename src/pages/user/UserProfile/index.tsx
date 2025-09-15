import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { Loading } from "@/shared/components";
import { deleteAccount, signOutUser } from "@/features/auth/firebase/methods";
import { updateUser } from "@/shared/services/";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { db } from "@/lib/firebase/firestore";
import { normalizeDate, isPast } from "@/shared/utils";

import { leaveWaitlist } from "@/features/merch/services/waitlist-service";
import { merchanItems } from "@/features/merch/data/items";
import { FakeImg, CloseRedIcon } from "@/assets/images";

import { getActivitiesOnce } from "@/features/activities/firebase/methods";
import { removeAttendee } from "@/features/activities/services";

import styles from "./UserProfile.module.css";
import { MyAct, MyActivitiesCard } from "./components/MyActivitiesCard";
import {
    MyWaitlistCard,
    ProfilePreferencesCard,
    SecurityCard,
} from "./components";

export const UserProfile = () => {
    const { user, userData, loading } = useAuth();

    const [displayName, setDisplayName] = useState(userData?.displayName ?? "");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState<string>("");

    const [waitItems, setWaitItems] = useState<
        { id: string; title: string; price: number; img?: string }[]
    >([]);
    const [loadingWait, setLoadingWait] = useState(false);

    const [myActs, setMyActs] = useState<MyAct[]>([]);
    const [loadingActs, setLoadingActs] = useState(false);

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
            const rows = await getActivitiesOnce();
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

    if (loading) return <Loading message="Comprovant sessió…" />;
    if (!user) return <p>No has iniciat sessió.</p>;

    return (
        <div className="page">
            <h1 className="h1">El meu perfil</h1>

            <section className={styles.section}>
                <p role="status" aria-live="polite">
                    {status}
                </p>

                <MyActivitiesCard
                    myActs={myActs}
                    loadingActs={loadingActs}
                    busy={busy}
                    onUnsubscribe={handleUnsubscribe}
                />

                <MyWaitlistCard
                    items={waitItems.map((i) => ({
                        ...i,
                        img: i.img || FakeImg,
                    }))}
                    loading={loadingWait}
                    busy={busy}
                    onLeave={handleLeave}
                    closeIcon={CloseRedIcon}
                />

                <ProfilePreferencesCard
                    displayName={displayName}
                    setDisplayName={setDisplayName}
                    busy={busy}
                    onSubmitUpdate={onSubmitUpdate}
                />

                <SecurityCard
                    password={password}
                    setPassword={setPassword}
                    busy={busy}
                    onSignOut={onSignOut}
                    onDelete={onDelete}
                />
            </section>
        </div>
    );
};
