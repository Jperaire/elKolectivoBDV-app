import { Button, Card } from "../../../../../../shared/components";
import styles from "./Activity.module.css";

export const Activity = () => {
    return (
        <Card className={styles.card}>
            <article className={styles.activity}>
                <p className={styles.datePill}>6 d'Octubre · 18:30h</p>
                <h2>Nom activitat</h2>
                <p>
                    Descripció breu de l’activitat amb 1–2 frases perquè quedi
                    net i clar.
                </p>
                <div className={styles.meta}>
                    <span className={styles.location}>Ateneu de Barberà</span>
                    <span className={styles.type}>Taller</span>
                </div>
                <div className={styles.actions}>
                    <Button className={styles.primary}>Inscriu-t’hi</Button>
                    <Button className={styles.ghost}>Google Calendar</Button>
                    <Button className={styles.secondary}>ICS</Button>
                </div>
            </article>
        </Card>
    );
};
