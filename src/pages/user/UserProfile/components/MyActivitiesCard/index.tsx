import { Card, Button, Loading } from "@/shared/components";
import styles from "./MyActivitiesCard.module.css";

export type MyAct = {
    id: string;
    title: string;
    date: Date;
    location?: string;
};

type Props = {
    myActs: MyAct[];
    loadingActs: boolean;
    busy: boolean;
    onUnsubscribe: (id: string, title: string) => void;
};

export const MyActivitiesCard = ({
    myActs,
    loadingActs,
    busy,
    onUnsubscribe,
}: Props) => {
    return (
        <Card>
            <article aria-labelledby="myacts-title" className={styles.article}>
                <h2 id="myacts-title">Les meves activitats</h2>

                {loadingActs ? (
                    <Loading message="Carregant les teves activitats…" />
                ) : myActs.length === 0 ? (
                    <p>No tens inscripcions pròximes.</p>
                ) : (
                    <div className={styles.tableWrapper}>
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
                                            {r.date.toLocaleString("ca-ES", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                        <td>{r.location || "—"}</td>
                                        <td>
                                            <Button
                                                variant="button--gray"
                                                onClick={() =>
                                                    onUnsubscribe(r.id, r.title)
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
    );
};
