import { CheckIcon, FakeImg } from "../../../assets/images";

import {
    Accordion,
    AccordionItem,
    Animated,
    Card,
    Contact,
} from "../../../shared/components";
import { allColors } from "../../../shared/utils/colors";

import { getRandomColor } from "../../../shared/utils/getRandomColor";
import { Banner } from "../../components/Banner";
import styles from "./HomePage.module.css";
import { sections, description, whatWeDo, values, faqs } from "./homeData";

export const HomePage = () => {
    return (
        <div className={styles.homeContainer}>
            <Banner />

            <div className={styles.sectionsContainer}>
                {/* Who whe are */}
                <section
                    aria-labelledby={sections.whoWeAre.id}
                    className={styles.whoWeAre}
                >
                    <Card hoverEffect={false}>
                        <h2 id={sections.whoWeAre.id}>
                            {sections.whoWeAre.title}
                        </h2>
                        <div className={styles.whoWeAreContent}>
                            <Animated animation="swing">
                                <img
                                    src={FakeImg}
                                    className={styles.groupImg}
                                />
                            </Animated>
                            <p>{description}</p>
                        </div>
                    </Card>
                </section>

                {/* What we do */}
                <section
                    aria-labelledby={sections.whatWeDo.id}
                    className={styles.whatWeDo}
                >
                    <Card hoverEffect={false}>
                        <h2 id={sections.whatWeDo.id}>
                            {sections.whatWeDo.title}
                        </h2>
                        <ul className={styles.whatWeDoList}>
                            {whatWeDo.map((item, i) => (
                                <li key={i}>
                                    <img src={CheckIcon} alt="check icon" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </section>

                {/* Values */}
                <section
                    aria-labelledby={sections.values.id}
                    className={styles.values}
                >
                    <Card hoverEffect={false}>
                        <h2 id={sections.values.id}>{sections.values.title}</h2>
                        <ul className={styles.values}>
                            {values.map((val, i) => (
                                <li
                                    key={i}
                                    className={styles.valueItem}
                                    style={{
                                        backgroundColor:
                                            getRandomColor(allColors),
                                    }}
                                >
                                    {val}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </section>

                {/* FAQs */}
                <section
                    aria-labelledby={sections.faqs.id}
                    className={styles.faqs}
                >
                    <Card hoverEffect={false}>
                        <h2 id={sections.faqs.id}>{sections.faqs.title}</h2>
                        <Accordion>
                            {faqs.map((faq, i) => (
                                <AccordionItem key={i} title={faq.q}>
                                    {faq.a}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>
                </section>

                {/* Contact */}
                <section
                    aria-labelledby={sections.contact.id}
                    className={styles.contact}
                >
                    <Card hoverEffect={false}>
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
