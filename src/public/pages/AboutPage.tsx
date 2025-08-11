import { Banner } from "../components/Banner";

export const AboutPage = () => {
    return (
        <>
            <Banner />

            <section aria-labelledby="qui-som">
                <h2 id="qui-som">Qui som</h2>
                <p>
                    El ꓘolectivo és un espai d’acompanyament, segur i informatiu
                    dirigit a persones del col·lectiu LGTBINBQ+ i familiars que
                    busquin suport, recursos i una comunitat a Barberà del
                    Vallès.
                </p>
                <p>
                    Som una associació sense jerarquies: funcionem de manera
                    horitzontal i prenem decisions en assemblea.
                </p>
            </section>

            <section aria-labelledby="que-fem">
                <h2 id="que-fem">Què fem</h2>
                <ul>
                    <li>
                        Creem espais interns de suport mutu, segurs i càlids per
                        a totes les persones del col·lectiu.
                    </li>
                    <li>
                        Generem espais LGTBINBQ+ friendly oberts, inclusius i
                        lliures a Barberà.
                    </li>
                    <li>
                        Desenvolupem projectes i activitats proposades per
                        qualsevol membre de l’associació.
                    </li>
                    <li>
                        Sensibilitzem la població sobre la necessitat de drets,
                        espais i referents LGTBINBQ+.
                    </li>
                </ul>
            </section>

            <section aria-labelledby="els-nostres-valors">
                <h2 id="els-nostres-valors">Els nostres valors</h2>
                <ul>
                    <li>Equitat</li>
                    <li>Transfeminisme</li>
                    <li>Inclusió</li>
                    <li>Companyia</li>
                </ul>
            </section>

            <section aria-labelledby="faqs">
                <h2 id="faqs">Preguntes freqüents</h2>

                <h3>Qui pot formar part d’El ꓘolectivo?</h3>
                <p>
                    Qualsevol persona del col·lectiu LGTBINBQ+ pot formar part.
                    Només cal escriure’ns per correu electrònic o Instagram.
                </p>

                <h3>Què significa formar part de l’associació?</h3>
                <p>
                    No implica paperassa ni despeses econòmiques. Només cal
                    venir a les assemblees, participar en la presa de decisions
                    i col·laborar en les tasques que acordin les persones
                    membres.
                </p>

                <h3>Només poden participar persones del col·lectiu?</h3>
                <p>
                    A les assemblees sí, per garantir un espai segur. Les
                    activitats públiques són obertes a tothom, especialment les
                    de sensibilització i informació.
                </p>
            </section>
        </>
    );
};
