import { useState } from "react";
import { updateUser } from "@/shared/services/";
import { updateProfile } from "firebase/auth";
import { deleteAccount, signOutUser } from "@/features/auth/firebase/methods";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Card, Button } from "@/shared/components";
import styles from "./UserProfile.module.css";
import { ThemeSwitcher, Pallete } from "@/features/theme/components/";

export const UserProfile = () => {
    const { user, userData, loading } = useAuth();
    const [displayName, setDisplayName] = useState(userData?.displayName ?? "");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState<string>("");

    if (loading) return <p>Carregant…</p>;
    if (!user) return <p>No has iniciat sessió.</p>;

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

    const onSubmitUpdate: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        run(async () => {
            const next = { displayName: displayName.trim() };
            await updateProfile(user, next);
            await updateUser(user.uid, next);
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

    return (
        <div className="page">
            <h1>El meu perfil</h1>

            <section className={styles.section}>
                {/* Feedback d'estat global */}
                <p role="status" aria-live="polite">
                    {status}
                </p>

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
                            <Pallete />
                        </div>
                    </article>
                </Card>

                {/* Esborrar compte */}
                <Card>
                    <article
                        aria-labelledby="delete-title"
                        className={styles.article}
                    >
                        <h2 id="delete-title">Esborra el compte</h2>
                        <p>Introdueix la teva contrasenya per confirmar.</p>
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
