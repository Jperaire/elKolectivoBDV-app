import { Link } from "react-router-dom";

import { Card } from "@/shared/components";
import { adminActionsData } from "./adminActionsData";
import styles from "./AdminDashboard.module.css";

export const AdminDashboard = () => {
    return (
        <div className="page">
            <h1 className="h1">Admin Dashboard</h1>

            <Card>
                <section className={styles.cards}>
                    {adminActionsData.map((action) => (
                        <Link
                            key={action.link}
                            to={action.link}
                            className={styles.bubble}
                            aria-label={action.title}
                        >
                            {action.img && (
                                <img
                                    src={action.img}
                                    alt=""
                                    aria-hidden="true"
                                    className={styles.icon}
                                />
                            )}
                            <h2 className={styles.title}>{action.title}</h2>
                        </Link>
                    ))}
                </section>
            </Card>
        </div>
    );
};
