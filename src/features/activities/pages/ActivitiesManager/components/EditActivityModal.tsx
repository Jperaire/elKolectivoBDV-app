import { useEffect } from "react";
import { Modal, Button } from "@/shared/components";
import { useForm } from "@/shared/hooks/useForm";
import {
    ActivityProps,
    UpdateActivityInput,
} from "@/features/activities/types";
import { uploadToCloudinary } from "@/shared/utils";
import { updateActivity } from "@/features/activities/firebase/methods";
import styles from "./ActivityModal.module.css";

interface EditActivityModalProps {
    open: boolean;
    activity: { id: string; data: ActivityProps } | null;
    onClose: () => void;
    onUpdated: (id: string, newData: ActivityProps) => void;
}

export const EditActivityModal = ({
    open,
    activity,
    onClose,
    onUpdated,
}: EditActivityModalProps) => {
    // Extendemos el formulario con signupUrl mientras actualizas types.ts
    const { setForm, ...form } = useForm({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        requiresSignup: false,
        hasCapacity: false,
        capacity: "",
        instagramUrl: "",
        signupUrl: "", // ✅ nuevo
        posterFile: null as File | null,
    });

    useEffect(() => {
        if (!activity) return;
        const d = activity.data;
        const iso = d.date.toISOString();
        setForm({
            title: d.title ?? "",
            date: iso.slice(0, 10),
            time: iso.slice(11, 16),
            location: d.location ?? "",
            description: d.description ?? "",
            requiresSignup: !!d.requiresSignup,
            hasCapacity: Number.isFinite(d.capacity),
            capacity: d.capacity != null ? String(d.capacity) : "",
            instagramUrl: d.instagramUrl ?? "",
            signupUrl: d.signupUrl ?? "", // ✅ precarga
            posterFile: null,
        });
    }, [activity, setForm]);

    const handleSave = async () => {
        if (!activity) return;

        const {
            date,
            time,
            title,
            location,
            description,
            requiresSignup,
            hasCapacity,
            capacity,
            instagramUrl,
            signupUrl,
            posterFile,
        } = form.formState;

        if (!date || !time) {
            alert("Falta data i hora.");
            return;
        }
        const dateTime = new Date(`${date}T${time}:00`);
        if (Number.isNaN(dateTime.getTime())) {
            alert("Data/hora invàlida.");
            return;
        }

        const capNum: number | null =
            hasCapacity && capacity !== "" ? Number(capacity) : null;
        const instaNorm: string | null = instagramUrl.trim()
            ? instagramUrl.trim()
            : null;
        const signupNorm: string | null = signupUrl.trim()
            ? signupUrl.trim()
            : null;

        let uploadedPoster: string | undefined;
        if (posterFile) uploadedPoster = await uploadToCloudinary(posterFile);

        // payload ampliado con signupUrl
        const payload: UpdateActivityInput & {
            signupUrl?: string | null;
        } = {
            title,
            date,
            time,
            location,
            description,
            requiresSignup,
            capacity: capNum,
            instagramUrl: instaNorm,
            signupUrl: signupNorm, // ✅ nuevo
            ...(uploadedPoster ? { posterUrl: uploadedPoster } : {}),
        };

        await updateActivity(activity.id, payload as any);

        const newData: ActivityProps = {
            ...activity.data,
            title,
            description,
            date: dateTime,
            location,
            requiresSignup,
            capacity: capNum ?? undefined,
            posterUrl: uploadedPoster ?? activity.data.posterUrl,
            instagramUrl: instaNorm ?? undefined,
            signupUrl: signupNorm ?? undefined, // ✅ reflejamos en estado local
        };

        onUpdated(activity.id, newData);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h2>Editar activitat</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={form.onInputChange}
                    placeholder="Títol"
                    required
                />
                <div className={styles.row}>
                    <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={form.onInputChange}
                        required
                    />
                    <input
                        name="time"
                        type="time"
                        value={form.time}
                        onChange={form.onInputChange}
                        required
                    />
                </div>
                <input
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={form.onInputChange}
                    placeholder="Ubicació"
                    required
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={form.onInputChange}
                    placeholder="Descripció"
                    rows={4}
                />
                <input
                    type="file"
                    name="posterFile"
                    key={`poster-${form.fileKey}`}
                    onChange={form.onInputChange}
                    accept="image/*,application/pdf"
                />
                <input
                    name="instagramUrl"
                    type="text"
                    value={form.instagramUrl}
                    onChange={form.onInputChange}
                    placeholder="Enllaç a Instagram"
                />

                {/* ✅ NUEVO: enlace a Google Forms */}
                <input
                    name="signupUrl"
                    type="text"
                    value={form.signupUrl}
                    onChange={form.onInputChange}
                    placeholder="Enllaç a Google Forms (inscripció)"
                />

                <div className={styles.controlsRow}>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            name="requiresSignup"
                            checked={form.requiresSignup}
                            onChange={form.onInputChange}
                        />
                        Requereix inscripció
                    </label>
                    <label className={styles.checkbox}>
                        <input
                            type="checkbox"
                            name="hasCapacity"
                            checked={form.hasCapacity}
                            onChange={form.onInputChange}
                        />
                        Té aforament
                    </label>
                    {form.hasCapacity && (
                        <label className={styles.capacity}>
                            <span>Aforament:</span>
                            <input
                                name="capacity"
                                type="number"
                                min={0}
                                value={form.capacity}
                                onChange={form.onInputChange}
                                placeholder="0"
                            />
                        </label>
                    )}
                </div>
                <div className={styles.actions}>
                    <Button type="submit">Guardar</Button>
                    <Button variant="button--secondary" onClick={onClose}>
                        Cancel·lar
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
