import { Card, Button } from "../../../shared/components";
import { useForm } from "../../../shared/hooks/useForm";

type NewsForm = {
    title: string;
    imageUrl: string;
    body: string;
};

export const NewsManager = () => {
    const { title, imageUrl, body, onInputChange, onResetForm } =
        useForm<NewsForm>({ title: "", imageUrl: "", body: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: guardar en Firestore
        console.log("createNews →", { title, imageUrl, body });
        onResetForm();
        alert("📰 Notícia publicada (demo).");
    };

    return (
        <div className="page">
            <h1>Notícies</h1>

            <Card>
                <section>
                    <form onSubmit={handleSubmit} noValidate>
                        <input
                            name="title"
                            placeholder="Títol"
                            value={title}
                            onChange={onInputChange}
                            required
                        />
                        <input
                            name="imageUrl"
                            placeholder="Imatge (URL opcional)"
                            value={imageUrl}
                            onChange={onInputChange}
                        />
                        <textarea
                            name="body"
                            placeholder="Contingut"
                            rows={6}
                            value={body}
                            onChange={onInputChange}
                            required
                        />
                        <Button type="submit" variant="button--blue">
                            Publicar
                        </Button>
                    </form>
                </section>
            </Card>
        </div>
    );
};
