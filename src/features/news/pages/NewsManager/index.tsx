import { useState } from "react";
import { Card, Button } from "@/shared/components";
import { useForm } from "@/shared/hooks/useForm";
import { uploadToCloudinary } from "@/shared/utils";
import { NewsForm } from "../../types";
import { createNews } from "../../firebase/methods";
import styles from "./NewsManager.module.css";

export const NewsManager = () => {
    const { title, body, imageFile, fileKey, onInputChange, onResetForm } =
        useForm<NewsForm>({
            title: "",
            body: "",
            imageFile: null,
        });

    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setSaving(true);

            const imageUrl = imageFile
                ? await uploadToCloudinary(imageFile)
                : undefined;

            await createNews({
                title,
                body,
                imageUrl,
            });

            onResetForm();
            alert("✅ Notícia publicada.");
        } catch (err) {
            console.error(err);
            alert("❌ No s'ha pogut publicar la notícia.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="page">
            <h1>Notícies</h1>
            <p className="subtitle">
                Crea i gestiona les notícies de la comunitat.
            </p>

            <Card>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        name="title"
                        placeholder="Títol"
                        value={title}
                        onChange={onInputChange}
                        required
                    />
                    <textarea
                        name="body"
                        placeholder="Contingut"
                        rows={6}
                        value={body}
                        onChange={onInputChange}
                        required
                    />
                    <input
                        key={`image-${fileKey}`}
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        onChange={onInputChange}
                    />

                    <Button
                        type="submit"
                        variant="button--blue"
                        disabled={saving}
                    >
                        {saving ? "Guardant…" : "Publicar notícia"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};
