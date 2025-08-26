import { Activity } from "./components/Activity";
import styles from "./ActivitiesPage.module.css";

export const ActivitiesPage = () => {
    return (
        <div className="page">
            <h1>Activitats</h1>
            <section className={styles.section}>
                <Activity />
                <Activity />
            </section>
        </div>
    );
};
