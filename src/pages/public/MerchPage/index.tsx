import styles from "./MerchPage.module.css";
import { Card, Button } from "../../../shared/components";
import { FakeImg } from "../../../assets/images";

type Item = {
    id: string;
    title: string;
    price: number;
    img?: string;
};

const mockItems: Item[] = [
    { id: "tee-1", title: "Samarreta logo", price: 18, img: FakeImg },
    { id: "tee-2", title: "Samarreta gradient", price: 20, img: FakeImg },
    { id: "sticker-1", title: "Pack d’stickers", price: 4, img: FakeImg },
    { id: "tote-1", title: "Bossa Tote", price: 12, img: FakeImg },
    { id: "hoodie-1", title: "Dessudadora", price: 32, img: FakeImg },
    { id: "mug-1", title: "Tassa", price: 10, img: FakeImg },
];

const fmt = new Intl.NumberFormat("ca-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
});

export const MerchPage = () => {
    const handleAdd = (item: Item) => {
        alert(`🛒 ${item.title} — ${fmt.format(item.price)}`);
    };

    return (
        <section className="page">
            <h1>Merchan</h1>
            <p>Suporta el col·lectiu amb productes xulos ✨</p>

            <div className={styles.grid} aria-label="Catàleg de productes">
                {mockItems.map((item) => (
                    <article key={item.id}>
                        <Card>
                            <img src={item.img || FakeImg} alt={item.title} />

                            <div className={styles.row}>
                                <h2 className={styles.title}>{item.title}</h2>

                                <div className={styles.right}>
                                    <p className={styles.price}>
                                        {fmt.format(item.price)}
                                    </p>
                                    <Button
                                        type="button"
                                        variant="button--pink"
                                        size="large"
                                        onClick={() => handleAdd(item)}
                                        aria-label={`Afegir ${item.title} a la cistella`}
                                    >
                                        La vull
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </article>
                ))}
            </div>
        </section>
    );
};
