import { useEffect } from "react";
import { Modal, Button } from "@/shared/components";
import { useForm } from "@/shared/hooks/useForm";
import { uploadToCloudinary } from "@/shared/utils";

import { EditNewsModalProps, UpdateNewsInput } from "@/features/news/types";
import { updateNews } from "@/features/news/firebase/methods";

import styles from "./NewsModal.module.css";

export const EditNewsModal = ({
    open,
    news,
    onClose,
    onUpdated,
}: EditNewsModalProps) => {
    const { setForm, ...form } = useForm({
        title: "",
        body: "",
        imageFile: null as File | null,
    });

    useEffect(() => {
        if (!news) return;
        setForm({
            title: news.data.title,
            body: news.data.description,
            imageFile: null,
        });
    }, [news, setForm]);

    const handleSave = async () => {
        if (!news) return;
        const { title, body, imageFile } = form.formState;

        let uploaded: string | undefined;
        if (imageFile) uploaded = await uploadToCloudinary(imageFile);

        const payload: UpdateNewsInput = {
            title,
            body,
            ...(uploaded ? { imageUrl: uploaded } : {}),
        };

        await updateNews(news.id, payload);

        onUpdated(news.id, {
            ...news.data,
            title,
            description: body,
            imageUrl: uploaded ?? news.data.imageUrl,
        });

        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h2>Editar notícia</h2>
            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <input
                    name="title"
                    value={form.title}
                    onChange={form.onInputChange}
                    placeholder="Títol"
                    required
                />
                <textarea
                    name="body"
                    rows={6}
                    value={form.body}
                    onChange={form.onInputChange}
                    placeholder="Contingut"
                    required
                />
                <input
                    type="file"
                    name="imageFile"
                    key={`img-${form.fileKey}`}
                    accept="image/*"
                    onChange={form.onInputChange}
                />
                <div className={styles.actions}>
                    <Button type="submit">Guardar</Button>
                    <Button
                        variant="button--secondary"
                        type="button"
                        onClick={onClose}
                    >
                        Cancel·lar
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
