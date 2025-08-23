import styles from "./ActivitiesManager.module.css";
import { Card, Button } from "../../../shared/components";
import { useForm } from "../../../shared/hooks/useForm";

type ActivityForm = {
    title: string;
    date: string; // ISO yyyy-mm-dd
    time: string; // hh:mm
    location: string;
    description: string;
};

export const ActivitiesManager = () => {
    const {
        title,
        date,
        time,
        location,
        description,
        onInputChange,
        onResetForm,
    } = useForm<ActivityForm>({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: guardar en Firestore
        console.log("createActivity →", {
            title,
            date,
            time,
            location,
            description,
        });
        onResetForm();
        alert("✅ Activitat creada.");
    };

    return (
        <div className="page">
            <h1>Activitats</h1>

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
                            placeholder="Descripció (opcional)"
                            rows={4}
                            value={description}
                            onChange={onInputChange}
                        />

                        <Button type="submit" variant="button--blue">
                            Crear activitat
                        </Button>
                    </form>
                </section>
            </Card>
        </div>
    );
};
