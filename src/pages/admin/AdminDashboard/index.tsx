import { Link } from "react-router-dom";
import { Card } from "../../../shared/components";
import styles from "./AdminDashboard.module.css";

export const AdminDashboard = () => {
    const adminActions = [
        {
            title: "Manage Members",
            description: "Review and approve membership requests.",
            link: "/admin/membership-requests",
        },
        {
            title: "Manage Activities",
            description: "Create, edit and remove activities.",
            link: "/admin/activities",
        },
        {
            title: "Manage News",
            description: "Publish and edit community news.",
            link: "/admin/news",
        },
        // ...añades más
    ];

    return (
        <div className={styles.dashboard}>
            <h1>Admin Dashboard</h1>
            <div className={styles.cards}>
                {adminActions.map((action) => (
                    <Card key={action.link} hoverEffect>
                        <h2>{action.title}</h2>
                        <p>{action.description}</p>
                        <Link to={action.link}>Go</Link>
                    </Card>
                ))}
            </div>
        </div>
    );
};
