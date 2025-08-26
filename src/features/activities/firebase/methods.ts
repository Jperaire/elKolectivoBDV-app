import { addDoc, Timestamp, collection } from "firebase/firestore";
import { db } from "../../../firebase/firestore";

// Une "YYYY-MM-DD" + "HH:mm" en un Date
const combineDateTime = (isoDate: string, hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    const d = new Date(isoDate);
    d.setHours(h ?? 0, m ?? 0, 0, 0);
    return d;
};

export const createActivity = async (input: {
    title: string;
    date: string;
    time: string;
    location: string;
    description?: string;
}) => {
    const startAt = combineDateTime(input.date, input.time);

    await addDoc(collection(db, "activities"), {
        title: input.title,
        location: input.location,
        description: input.description || "",
        startAt: Timestamp.fromDate(startAt),
        createdAt: Timestamp.now(),
    });
};
