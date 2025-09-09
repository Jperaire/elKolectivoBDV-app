import styles from "./MembersManager.module.css";
import { BackButton } from "@/shared/components";

export const MembersManager = () => {
    return (
        <div className="page">
            <h1>Membres</h1>
            <p className="subtitle">
                Visualitza els membres de la comunitat i aprova les noves
                sol·licituds.
            </p>

            <section></section>

            <BackButton to="/admin" />
        </div>
    );
};
