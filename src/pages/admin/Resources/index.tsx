import { IDCard, LinkCard } from "./components";
import { LINKS } from "./utils/data";
import styles from "./Resources.module.css";
import { BackButton } from "@/shared/components";

export const Resources = () => {
    return (
        <div className="page">
            <h1 className="h1">Recursos i links d'interès</h1>

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

            <BackButton to="/admin" />
        </div>
    );
};
