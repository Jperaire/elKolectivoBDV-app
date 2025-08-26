import { Activity } from "./components/Activity";
import styles from "./ActivitiesPage.module.css";

export const ActivitiesPage = () => {
    const items = [
        {
            id: "a1",
            title: "Taller d’iniciació",
            description: "Aprèn les bases i comparteix amb el grup.",
            date: "2025-10-06T18:30:00+02:00",
            location: "Ateneu de Barberà",
            type: "Taller",
            capacity: 30,
            attendeesCount: 28,
            requiresSignup: true,
        },
        {
            id: "a2",
            title: "Assemblea mensual",
            description: "Posada en comú d’activitats i idees.",
            date: "2025-10-12T19:00:00+02:00",
            location: "Online",
            type: "Reunió",
            requiresSignup: false,
        },
        {
            id: "a3",
            title: "Cercavila",
            description: "Sortim al carrer! Música i bon ambient.",
            date: "2025-08-10T18:00:00+02:00",
            location: "Plaça Major",
            type: "Esdeveniment",
            capacity: 20,
            attendeesCount: 20,
            requiresSignup: true,
        },
    ];

    return (
        <div className="page">
            <h1>Activitats</h1>
            <section className={styles.section}>
                {items.map((a) => (
                    <Activity key={a.id} {...a} />
                ))}
            </section>
        </div>
    );
};
