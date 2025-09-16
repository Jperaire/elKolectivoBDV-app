import { Accordion, AccordionItem, Card } from "@/shared/components";
import { Banner, Contact, QueerFlagsMarquee, WhatWeDo } from "./components";
import { sections, description, values, faqs } from "./homeData";

import styles from "./Home.module.css";

export const Home = () => {
    return (
        <div className={styles.home}>
            <Banner />

            <div className={styles.homeInner}>
                {/* Who whe are */}
                <section
                    aria-labelledby={sections.whoWeAre.id}
                    className={styles.sectionWho}
                >
                    <Card>
                        <h2 id={sections.whoWeAre.id}>
                            {sections.whoWeAre.title}
                        </h2>
                        <div className={styles.sectionBody}>
                            <p>{description}</p>

                            <QueerFlagsMarquee />
                        </div>
                    </Card>
                </section>

                {/* What we do */}
                <WhatWeDo />

                {/* Values */}
                <section aria-labelledby={sections.values.id}>
                    <Card>
                        <h2 id={sections.values.id}>{sections.values.title}</h2>
                        <ul className={styles.chipList}>
                            {values.map((val, i) => (
                                <li key={i} className={styles.chip}>
                                    {val.label}
                                    <span className={styles.tooltip}>
                                        {val.definition}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </section>

                {/* FAQs */}
                <section
                    aria-labelledby={sections.faqs.id}
                    className={styles.sectionFaqs}
                >
                    <Card>
                        <h2 id={sections.faqs.id}>{sections.faqs.title}</h2>
                        <div className={styles.accordionWrapper}>
                            <Accordion>
                                {faqs.map((faq, i) => (
                                    <AccordionItem key={i} title={faq.q}>
                                        {faq.a}
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </Card>
                </section>

                {/* Contact */}
                <section
                    aria-labelledby={sections.contact.id}
                    className={styles.sectionContact}
                >
                    <Card>
                        <h2 id={sections.contact.id}>
                            {sections.contact.title}
                        </h2>
                        <p>
                            Tens algun dubte o vols preguntar-nos alguna cosa?
                            Ets una entitat i tens una proposta? Contacta’ns a
                            través de les nostres xarxes socials o mitjançant el
                            formulari de sota!
                        </p>
                        <Contact />
                    </Card>
                </section>
            </div>
        </div>
    );
};
