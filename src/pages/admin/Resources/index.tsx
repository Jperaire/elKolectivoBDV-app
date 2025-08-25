import { IDCard, LinkCard } from "./components";
import styles from "./Resources.module.css";
import { LINKS } from "./utils/data";

export const Resources = () => {
    return (
        <div className="page">
            <h1>Recursos i links d'interès</h1>

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
