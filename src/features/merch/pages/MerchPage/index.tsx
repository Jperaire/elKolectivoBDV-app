import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { Card, Button, Modal } from "@/shared/components";
import { db } from "@/lib/firebase/firestore";
import { FakeImg } from "@/assets/images";
import { fmtEUR } from "@/shared/utils";
import { useAuth } from "@/features/auth/hooks";

import { Item } from "../../types";
import { joinWaitlist, leaveWaitlist } from "../../services/waitlist-service";
import { merchanItems } from "../../data/items";

import styles from "./MerchPage.module.css";

export const MerchPage = () => {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<Item | null>(null);
    const [waitlist, setWaitlist] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (!user) return;
        merchanItems.forEach(async (item) => {
            const ref = doc(db, "waitlist", `${user.uid}_${item.id}`);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setWaitlist((prev) => ({ ...prev, [item.id]: true }));
            }
        });
    }, [user]);

    const handleAdd = async (item: Item) => {
        if (!user) {
            setSelected(item);
            setShowModal(true);
            return;
        }

        const already = waitlist[item.id];

        try {
            if (already) {
                await leaveWaitlist(user.uid, item.id);
                setWaitlist((prev) => ({ ...prev, [item.id]: false }));
                alert(
                    `❌ Has sortit de la llista d’espera de “${item.title}”.`
                );
            } else {
                await joinWaitlist(
                    user.uid,
                    { id: item.id, title: item.title, price: item.price },
                    user.email || "sense-email",
                    user.displayName || ""
                );
                setWaitlist((prev) => ({ ...prev, [item.id]: true }));
                alert(
                    `✅ T’has afegit a la llista d’espera de “${item.title}”.`
                );
            }
        } catch (err) {
            console.error(err);
            alert("Error, torna-ho a provar.");
        }
    };

    return (
        <section className="page">
            <h1>Merchan</h1>
            <p className="subtitle">
                Fem comandes periòdiques. Si t’interessa algun producte,
                apunta’t a la llista d’espera i t’avisarem per correu quan obrim
                comanda i t'informarem de com fer el pagament.
            </p>

            <div className={styles.grid} aria-label="Catàleg de productes">
                {merchanItems.map((item) => (
                    <article key={item.id}>
                        <Card>
                            <img src={item.img || FakeImg} alt={item.title} />

                            <div className={styles.row}>
                                <h2 className={styles.title}>{item.title}</h2>

                                <div className={styles.right}>
                                    <p className={styles.price}>
                                        {fmtEUR.format(item.price)}
                                    </p>
                                    <Button
                                        type="button"
                                        variant="button--pink"
                                        onClick={() => handleAdd(item)}
                                    >
                                        {waitlist[item.id]
                                            ? "Ja no la vull"
                                            : "La vull"}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </article>
                ))}
            </div>

            {/* Modal de login */}
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                titleId="login-modal-title"
            >
                <h3 id="login-modal-title">Inicia sessió per apuntar-te</h3>
                <p>
                    Has d’<strong>iniciar sessió</strong> per afegir-te a la
                    llista d’espera{selected ? ` de “${selected.title}”` : ""}.
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button to="/login" variant="button--blue">
                        Inicia sessió
                    </Button>
                    <Button
                        type="button"
                        variant="button--gray"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel·la
                    </Button>
                </div>
            </Modal>
        </section>
    );
};
