import { fakeImg } from "../../../assets/images";
import { CheckIcon } from "../../../assets/images/icons";
import { Accordion, AccordionItem } from "../../../shared/components/Accordion";
import { Animated } from "../../../shared/components/Animated";
import { Card } from "../../../shared/components/Card";
import { Banner } from "../../components/Banner";
import styles from "./HomePage.module.css";
import { sections, description, whatWeDo, values, faqs } from "./homeData";

export const HomePage = () => {
    return (
        <div className={styles.homeContainer}>
            <Banner />

            <div className={styles.sectionsContainer}>
                {/* Who whe are */}
                <section aria-labelledby={sections.whoWeAre.id}>
                    <Card hoverEffect={false}>
                        <h2 id={sections.whoWeAre.id}>
                            {sections.whoWeAre.title}
                        </h2>
                        <div className={styles.whoWeAreContent}>
                            <Animated animation="swing">
                                <img
                                    src={fakeImg}
                                    className={styles.groupImg}
                                />
                            </Animated>
                            <p>{description}</p>
                        </div>
                    </Card>
                </section>

                {/* What we do */}
                <section aria-labelledby={sections.whatWeDo.id}>
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
                <section aria-labelledby={sections.values.id}>
                    <Card hoverEffect={false}>
                        <h2 id={sections.values.id}>{sections.values.title}</h2>
                        <ul className={styles.values}>
                            {values.map((val, i) => (
                                <li key={i}>
                                    <Card>{val}</Card>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </section>

                {/* FAQs */}
                <section aria-labelledby={sections.faqs.id}>
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
            </div>
        </div>
    );
};
