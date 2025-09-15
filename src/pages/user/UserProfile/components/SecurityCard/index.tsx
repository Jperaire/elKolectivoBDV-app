import { Card, Button } from "@/shared/components";
import styles from "./SecurityCard.module.css";

type Props = {
    password: string;
    setPassword: (v: string) => void;
    busy: boolean;
    onSignOut: () => void;
    onDelete: () => void;
};

export const SecurityCard = ({
    password,
    setPassword,
    busy,
    onSignOut,
    onDelete,
}: Props) => {
    return (
        <Card>
            <article
                aria-labelledby="security-title"
                className={styles.article}
            >
                <h2 id="security-title">Seguretat</h2>

                <div className={styles.content}>
                    <div className={styles.actionsWrapper}>
                        <Button
                            type="button"
                            onClick={onSignOut}
                            disabled={busy}
                            aria-label="Tancar sessió"
                            title="Tanca la sessió"
                        >
                            {busy ? "Tancant…" : "Tanca sessió"}
                        </Button>
                        <Button
                            to="/reset-password"
                            aria-label="Recuperar contrasenya"
                            title="Recuperar contrasenya"
                        >
                            Recuperar contrasenya
                        </Button>
                    </div>
                    <div className={styles.dangerZone}>
                        <h3 className={styles.dangerTitle}>Danger zone</h3>
                        <p className={styles.dangerText}>
                            Esborrar el compte és permanent. Introdueix la
                            contrasenya per confirmar.
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
                            aria-label="Esborra el compte"
                        >
                            {busy ? "Esborrant…" : "Esborra el compte"}
                        </Button>
                    </div>
                </div>
            </article>
        </Card>
    );
};
