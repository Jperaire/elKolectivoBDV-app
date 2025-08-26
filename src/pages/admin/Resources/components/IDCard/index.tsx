import { useState } from "react";
import { Button, Card, Copy } from "@/shared/components";
import { ENTITY } from "../../utils/data";

import styles from "./IDCard.module.css";

export const IDCard = () => {
    const [showNif, setShowNif] = useState(false);
    const [showAddr, setShowAddr] = useState(false);

    return (
        <Card>
            <article className={styles.cardWrapper}>
                <h2>Dades Fiscals Entitat</h2>

                <table className={styles.entityTable}>
                    <tbody>
                        <tr>
                            <th>Nom</th>
                            <td>
                                <span>{ENTITY.name}</span>
                                <Copy value={ENTITY.name} />
                            </td>
                        </tr>

                        <tr>
                            <th>NIF</th>
                            <td>
                                {!showNif ? (
                                    <Button
                                        variant="button--ghost"
                                        onClick={() => setShowNif(true)}
                                    >
                                        Mostra
                                    </Button>
                                ) : (
                                    <>
                                        <span>{ENTITY.nif}</span>
                                        <Copy value={ENTITY.nif} />
                                    </>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <th>Adreça</th>
                            <td>
                                {!showAddr ? (
                                    <Button
                                        variant="button--ghost"
                                        onClick={() => setShowAddr(true)}
                                    >
                                        Mostra
                                    </Button>
                                ) : (
                                    <>
                                        <span>{ENTITY.address}</span>
                                        <Copy value={ENTITY.address} />
                                    </>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </Card>
    );
};
