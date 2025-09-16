import { useState } from "react";
import { Modal, Button } from "@/shared/components";
import { useForm } from "@/shared/hooks";
import { uploadToCloudinary } from "@/shared/utils";
import { ActivityForm, ActivityProps } from "@/features/activities/types";
import { createActivity } from "@/features/activities/firebase/methods";
import styles from "./ActivityModal.module.css";

interface CreateActivityModalProps {
    open: boolean;
    onClose: () => void;
    onCreated: (newRow: { id: string; data: ActivityProps }) => void;
}

type ActivityFormWithSignup = ActivityForm & { signupUrl: string };

export const CreateActivityModal = ({
    open,
    onClose,
    onCreated,
}: CreateActivityModalProps) => {
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
        signupUrl,
        posterFile,
        fileKey,
        onInputChange,
        onResetForm,
    } = useForm<ActivityFormWithSignup>({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        requiresSignup: false,
        hasCapacity: false,
        capacity: "",
        instagramUrl: "",
        signupUrl: "",
        posterFile: null,
    });

    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !time) return alert("Falta data i hora.");

        try {
            setSaving(true);

            const capNum =
                hasCapacity && capacity !== "" ? Number(capacity) : undefined;
            const posterUrl = posterFile
                ? await uploadToCloudinary(posterFile)
                : undefined;

            const payload = {
                title,
                date,
                time,
                location,
                description,
                requiresSignup,
                capacity: capNum,
                posterUrl,
                instagramUrl,
                signupUrl: signupUrl?.trim() || null,
            } as any;

            const newId = await createActivity(payload);

            const dateTime = new Date(`${date}T${time}:00`);

            onCreated({
                id: newId,
                data: {
                    title,
                    description,
                    date: dateTime,
                    location,
                    requiresSignup,
                    capacity: capNum,
                    posterUrl,
                    instagramUrl: instagramUrl || undefined,
                    signupUrl: signupUrl?.trim() || undefined,
                },
            });

            onResetForm();
            onClose();
        } catch (err) {
            console.error(err);
            alert("❌ No s'ha pogut crear l'activitat.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h2>Crear nova activitat</h2>
            <form onSubmit={handleSubmit} noValidate className={styles.form}>
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

                <input
                    name="signupUrl"
                    placeholder="Enllaç a Google Forms (inscripció)"
                    value={signupUrl}
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

                <div className={styles.actions}>
                    <Button type="submit" disabled={saving}>
                        {saving ? "Guardant…" : "Crear activitat"}
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
