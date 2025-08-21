import { Card, Button } from "../../../shared/components";
import { adminActionsData } from "./AdminActionsData";
import styles from "./AdminDashboard.module.css";

export const AdminDashboard = () => {
    return (
        <div className={styles.dashboard}>
            <h1>Admin Dashboard</h1>
            <div className={styles.cards}>
                {adminActionsData.map((action) => (
                    <Card key={action.link} hoverEffect={false}>
                        <h2>{action.title}</h2>
                        <p>{action.description}</p>
                        <Button to={action.link} variant="button--blue">
                            Go
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};
