import {
    addDoc,
    Timestamp,
    collection,
    query,
    orderBy,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/firestore";
import { ActivityProps } from "../types";

// Une "YYYY-MM-DD" + "HH:mm" en un Date
const combineDateTime = (isoDate: string, hhmm: string) => {
    const [y, m, d] = (isoDate || "").split("-").map(Number);
    const [h, min] = (hhmm || "").split(":").map(Number);
    if (!y || !m || !d || Number.isNaN(h) || Number.isNaN(min)) {
        return null;
    }
    return new Date(y, m - 1, d, h, min, 0, 0);
};

export const createActivity = async (input: {
    title: string;
    date: string;
    time: string;
    location: string;
    description?: string;
    requiresSignup?: boolean;
    capacity?: number;
}) => {
    const startAt = combineDateTime(input.date, input.time);
    if (!startAt) {
        throw new Error("INVALID_DATETIME");
    }

    await addDoc(collection(db, "activities"), {
        title: input.title,
        location: input.location,
        description: input.description || "",
        requiresSignup: !!input.requiresSignup,
        ...(typeof input.capacity === "number"
            ? { capacity: input.capacity }
            : {}),
        startAt: Timestamp.fromDate(startAt),
        createdAt: serverTimestamp(),
    });
};

export const getActivitiesOnce = async (): Promise<
    Array<{ id: string; data: ActivityProps }>
> => {
    const q = query(collection(db, "activities"), orderBy("startAt", "asc"));
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
        // Tipado inline, sin any
        const {
            title = "",
            description = "",
            location = "",
            capacity,
            attendeesCount = 0,
            requiresSignup = false,
            startAt,
        } = d.data() as {
            title?: string;
            description?: string;
            location?: string;
            capacity?: number;
            attendeesCount?: number;
            requiresSignup?: boolean;
            startAt?: { toDate: () => Date };
        };

        const props: ActivityProps = {
            title,
            description,
            date: startAt ? startAt.toDate() : new Date(),
            location,
            capacity,
            attendeesCount,
            requiresSignup,
        };

        return { id: d.id, data: props };
    });
};
