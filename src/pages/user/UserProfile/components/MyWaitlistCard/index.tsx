import { Card, Loading } from "@/shared/components";
import { fmtEUR } from "@/shared/utils";
import styles from "./MyWaitlistCard.module.css";

type WaitItem = { id: string; title: string; price: number; img?: string };

type Props = {
    items: WaitItem[];
    loading: boolean;
    busy: boolean;
    onLeave: (id: string, title: string) => void;
    closeIcon: string;
};

export const MyWaitlistCard = ({
    items,
    loading,
    busy,
    onLeave,
    closeIcon,
}: Props) => {
    return (
        <Card>
            <article
                aria-labelledby="waitlist-title"
                className={styles.article}
            >
                <h2 id="waitlist-title">Merchan pendent</h2>

                <p className={styles.intro}>
                    Aquests són els articles que en algún moment et van
                    interessar. Ara ets a la llista d’espera. Quan fem una
                    comanda nova, t’avisarem per correu per assegurar-nos que
                    encara t’interessen i t’indicarem com fer el pagament.
                </p>

                {loading ? (
                    <Loading message="Carregant productes…" />
                ) : items.length === 0 ? (
                    <p>No tens productes a la llista d’espera.</p>
                ) : (
                    <ul className={styles.waitlist}>
                        {items.map((it) => (
                            <li key={it.id} className={styles.waitItem}>
                                <div className={styles.itemInfo}>
                                    <img
                                        src={it.img}
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
                                    onClick={() => onLeave(it.id, it.title)}
                                    disabled={busy}
                                    title="Eliminar de la meva llista"
                                    aria-label={`Eliminar ${it.title} de la meva llista`}
                                >
                                    <img src={closeIcon} alt="" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </article>
        </Card>
    );
};
