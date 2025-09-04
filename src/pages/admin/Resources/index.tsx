import { IDCard, LinkCard } from "./components";
import { LINKS } from "./utils/data";
import styles from "./Resources.module.css";

export const Resources = () => {
    return (
        <div className="page">
            <h1>Recursos i links d'interès</h1>
            <p className="subtitle">Informació útil i links d'interès</p>

            <section className={styles.section}>
                <div className={styles.entityWrapper}>
                    <IDCard />
                </div>

                <div className={styles.linksWrapper}>
                    {LINKS.map((res) => (
                        <LinkCard key={res.id} resource={res} />
                    ))}
                </div>
            </section>
        </div>
    );
};
