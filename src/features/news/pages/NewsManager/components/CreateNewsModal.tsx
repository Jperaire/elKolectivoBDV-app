import { useState } from "react";
import { Modal, Button } from "@/shared/components";
import { useForm } from "@/shared/hooks";
import { uploadToCloudinary } from "@/shared/utils";

import { CreateNewsModalProps } from "@/features/news/types";
import { createNews } from "@/features/news/firebase/methods";

import styles from "./NewsModal.module.css";

export const CreateNewsModal = ({
    open,
    onClose,
    onCreated,
}: CreateNewsModalProps) => {
    const {
        title,
        subtitle,
        body,
        date,
        imageFile,
        fileKey,
        onInputChange,
        onResetForm,
    } = useForm({
        title: "",
        subtitle: "",
        body: "",
        date: "",
        imageFile: null as File | null,
    });

    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);
            const imageUrl = imageFile
                ? await uploadToCloudinary(imageFile)
                : undefined;

            const selectedDate = date ? new Date(date) : new Date();

            const id = await createNews({
                title,
                subtitle,
                body,
                imageUrl,
                date: selectedDate,
            });

            onCreated({
                id,
                data: {
                    title,
                    subtitle,
                    description: body,
                    date: selectedDate,
                    imageUrl,
                },
            });

            onResetForm();
            onClose();
        } catch (err) {
            console.error(err);
            alert("❌ No s'ha pogut crear la notícia.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h2>Crear notícia</h2>
            <form onSubmit={handleSubmit} noValidate>
                <input
                    name="title"
                    placeholder="Títol"
                    value={title}
                    onChange={onInputChange}
                    required
                />
                <input
                    name="subtitle"
                    placeholder="Subtítol"
                    value={subtitle}
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
                    type="date"
                    name="date"
                    value={date}
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
                <div className={styles.actions}>
                    <Button type="submit" disabled={saving}>
                        {saving ? "Guardant…" : "Crear"}
                    </Button>
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
