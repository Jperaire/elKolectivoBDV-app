import {
    addDoc,
    Timestamp,
    collection,
    query,
    orderBy,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { combineDateTime } from "@/shared/utils";
import { ActivityProps } from "../types";

export const createActivity = async (input: {
    title: string;
    date: string;
    time: string;
    location: string;
    description?: string;
    requiresSignup?: boolean;
    capacity?: number;
    posterUrl?: string;
    instagramUrl?: string;
}) => {
    const startAt = combineDateTime(input.date, input.time);
    if (!startAt) throw new Error("INVALID_DATETIME");

    await addDoc(collection(db, "activities"), {
        title: input.title,
        location: input.location,
        description: input.description || "",
        requiresSignup: !!input.requiresSignup,
        ...(typeof input.capacity === "number"
            ? { capacity: input.capacity }
            : {}),
        posterUrl: input.posterUrl || null,
        instagramUrl: input.instagramUrl || null,
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
        const {
            title = "",
            description = "",
            location = "",
            capacity,
            attendeesCount = 0,
            requiresSignup = false,
            startAt,
            posterUrl,
            instagramUrl,
        } = d.data() as {
            title?: string;
            description?: string;
            location?: string;
            capacity?: number;
            attendeesCount?: number;
            requiresSignup?: boolean;
            startAt?: { toDate: () => Date };
            posterUrl?: string | null;
            instagramUrl?: string | null;
        };

        const props: ActivityProps = {
            title,
            description,
            date: startAt ? startAt.toDate() : new Date(),
            location,
            capacity,
            attendeesCount,
            requiresSignup,
            posterUrl: posterUrl ?? undefined,
            instagramUrl: instagramUrl ?? undefined,
        };

        return { id: d.id, data: props };
    });
};
