import { queerFlags } from "@/assets/images";
import styles from "./QueerFlagsMarquee.module.css";

export const QueerFlagsMarquee = () => {
    const row = [...queerFlags, ...queerFlags];

    return (
        <div className={styles.wrapper} aria-label="Queer flags slider">
            <div className={styles.track}>
                {row.map((f, i) => (
                    <div className={styles.item} key={i}>
                        <img src={f.src} alt={f.alt} />
                    </div>
                ))}
            </div>
        </div>
    );
};
