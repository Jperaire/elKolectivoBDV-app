import styles from "./MembersManager.module.css";
import { BackButton } from "@/shared/components";

export const MembersManager = () => {
    return (
        <div className="page">
            <h1 className="h1">Membres</h1>
            <p>
                Visualitza els membres de la comunitat i aprova les noves
                sol·licituds.
            </p>

            <section className={styles.members}></section>

            <BackButton to="/admin" />
        </div>
    );
};
