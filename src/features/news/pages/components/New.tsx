import { FakeImg } from "@/assets/images";
import styles from "./New.module.css";

export const New = () => {
    return (
        <article>
            <h2>TITULO NOTICIA</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit quaerat ipsam, ipsa libero modi voluptatum fugiat.
                Praesentium earum temporibus nesciunt aperiam, consequatur sunt
                tenetur ullam quae porro eaque velit in!
            </p>
            <img src={FakeImg} alt="" />
        </article>
    );
};
