import { useState } from "react";

import { Card, Button } from "@/shared/components";
import { useForm } from "@/shared/hooks/useForm";
import { uploadToCloudinary } from "@/shared/utils";

import { ActivityForm } from "../../types";
import { createActivity } from "../../firebase/methods";

import styles from "./ActivitiesManager.module.css";

export const ActivitiesManager = () => {
    const {
        title,
        date,
        time,
        location,
        description,
        requiresSignup,
        hasCapacity,
        capacity,
        instagramUrl,
        posterFile,
        fileKey,
        onInputChange,
        onResetForm,
    } = useForm<ActivityForm>({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        requiresSignup: false,
        hasCapacity: false,
        capacity: "",
        instagramUrl: "",
        posterFile: null,
    });

    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!date || !time) {
            alert("Falta data i hora.");
            return;
        }

        try {
            setSaving(true);

            let posterUrl: string | undefined;
            if (posterFile) {
                posterUrl = await uploadToCloudinary(posterFile);
            }

            const capNum =
                hasCapacity && capacity !== "" ? Number(capacity) : undefined;

            await createActivity({
                title,
                date,
                time,
                location,
                description,
                requiresSignup,
                capacity: Number.isFinite(capNum) ? capNum : undefined,
                posterUrl: posterUrl || undefined,
                instagramUrl: instagramUrl || undefined,
            });

            onResetForm();
            alert("✅ Activitat creada.");
        } catch (err) {
            console.error(err);
            alert("❌ No s'ha pogut crear l'activitat.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="page">
            <h1>Activitats</h1>
            <p className="subtitle">Crea, edita i elimina activitats.</p>

            <Card>
                <section className={styles.section}>
                    <form onSubmit={handleSubmit} noValidate>
                        <input
                            name="title"
                            placeholder="Títol"
                            value={title}
                            onChange={onInputChange}
                            required
                        />

                        <div className={styles.row}>
                            <input
                                type="date"
                                name="date"
                                value={date}
                                onChange={onInputChange}
                                required
                            />
                            <input
                                type="time"
                                name="time"
                                value={time}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <input
                            name="location"
                            placeholder="Ubicació"
                            value={location}
                            onChange={onInputChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Descripció"
                            rows={4}
                            value={description}
                            onChange={onInputChange}
                        />

                        <input
                            key={`poster-${fileKey}`}
                            type="file"
                            name="posterFile"
                            accept="image/*,application/pdf"
                            onChange={onInputChange}
                        />

                        <input
                            name="instagramUrl"
                            placeholder="Enllaç a Instagram"
                            value={instagramUrl}
                            onChange={onInputChange}
                        />

                        <div className={styles.controlsRow}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    name="requiresSignup"
                                    checked={requiresSignup}
                                    onChange={onInputChange}
                                />
                                <span>Requereix inscripció</span>
                            </label>

                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    name="hasCapacity"
                                    checked={hasCapacity}
                                    onChange={onInputChange}
                                />
                                <span>Té aforament</span>
                            </label>

                            {hasCapacity && (
                                <label className={styles.capacity}>
                                    <span>Aforament:</span>
                                    <input
                                        id="capacity"
                                        type="number"
                                        name="capacity"
                                        min={0}
                                        inputMode="numeric"
                                        value={capacity}
                                        onChange={onInputChange}
                                        placeholder="0"
                                    />
                                </label>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="button--blue"
                            disabled={saving}
                        >
                            {saving ? "Guardant…" : "Crear activitat"}
                        </Button>
                    </form>
                </section>
            </Card>
        </div>
    );
};
