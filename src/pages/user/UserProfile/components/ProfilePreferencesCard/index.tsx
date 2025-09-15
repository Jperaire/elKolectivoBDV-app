import { FormEvent } from "react";
import { Card, Button } from "@/shared/components";
import { ThemeSwitcher } from "@/features/theme/components/";
import styles from "./ProfilePreferencesCard.module.css";

type Props = {
    displayName: string;
    setDisplayName: (v: string) => void;
    busy: boolean;
    onSubmitUpdate: (e: FormEvent<HTMLFormElement>) => void;
};

export const ProfilePreferencesCard = ({
    displayName,
    setDisplayName,
    busy,
    onSubmitUpdate,
}: Props) => {
    return (
        <Card>
            <article aria-labelledby="profile-prefs" className={styles.article}>
                <h2 id="profile-prefs">Perfil i Preferències</h2>

                <form onSubmit={onSubmitUpdate} className={styles.profileRow}>
                    <label htmlFor="displayName">Nom visible:</label>
                    <div className={styles.inputGroup}>
                        <input
                            id="displayName"
                            name="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            autoComplete="name"
                            required
                        />
                        <Button
                            type="submit"
                            variant="button--red"
                            disabled={busy}
                        >
                            {busy ? "Guardant…" : "Desa canvis"}
                        </Button>
                    </div>
                </form>

                <div className={styles.switcherWrapper}>
                    <span className={styles.switcherLabel}>Tema:</span>
                    <ThemeSwitcher />
                </div>
            </article>
        </Card>
    );
};
