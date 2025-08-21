import { Link } from "react-router-dom";
import { adminActionsData } from "./adminActionsData";
import styles from "./AdminDashboard.module.css";
import { Card, PageTitle } from "../../../shared/components";

export const AdminDashboard = () => {
    return (
        <div className={styles.dashboard}>
            <PageTitle>Admin Dashboard</PageTitle>

            <Card background="#f7f7f8">
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
                            <h2>{action.title}</h2>
                            <p className={styles.desc}>{action.description}</p>
                        </Link>
                    ))}
                </section>
            </Card>
        </div>
    );
};
