import { useEffect, useState } from "react";
import { Card } from "@/shared/components";
import { sections, whatWeDo } from "../../homeData";

import styles from "./WhatWeDo.module.css";

import { CheckIcon, whatWeDoImages } from "@/assets/images";

export const WhatWeDo = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setIndex((prev) => (prev + 1) % whatWeDoImages.length),
            3000
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            aria-labelledby={sections.whatWeDo.id}
            className={styles.sectionWhat}
        >
            <Card>
                <h2 id={sections.whatWeDo.id}>{sections.whatWeDo.title}</h2>

                <div className={styles.slider}>
                    {whatWeDoImages.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`what we do ${i + 1}`}
                            className={`${styles.slide} ${
                                i === index ? styles.active : ""
                            }`}
                        />
                    ))}
                </div>

                <ul className={styles.featureList}>
                    {whatWeDo.map((item, i) => (
                        <li key={i} className={styles.featureItem}>
                            <img src={CheckIcon} alt="check icon" />
                            {item}
                        </li>
                    ))}
                </ul>
            </Card>
        </section>
    );
};
