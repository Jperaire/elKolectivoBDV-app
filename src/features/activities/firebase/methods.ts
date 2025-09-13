import {
    addDoc,
    Timestamp,
    collection,
    query,
    orderBy,
    getDocs,
    serverTimestamp,
    deleteDoc,
    doc,
    setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { combineDateTime } from "@/shared/utils";
import { ActivityProps, UpdateActivityInput } from "../types";

// CREATE
export const createActivity = async (input: {
    title: string;
    date: string; // yyyy-mm-dd
    time: string; // HH:mm
    location: string;
    description?: string;
    requiresSignup?: boolean;
    capacity?: number;
    posterUrl?: string;
    instagramUrl?: string;
    signupUrl?: string | null;
}) => {
    const startAt = combineDateTime(input.date, input.time);
    if (!startAt) throw new Error("INVALID_DATETIME");

    const docRef = await addDoc(collection(db, "activities"), {
        title: input.title,
        location: input.location,
        description: input.description || "",
        requiresSignup: !!input.requiresSignup,
        ...(typeof input.capacity === "number"
            ? { capacity: input.capacity }
            : {}),
        posterUrl: input.posterUrl || null,
        instagramUrl: input.instagramUrl || null,
        signupUrl: input.requiresSignup
            ? input.signupUrl?.trim() || null
            : null,
        startAt: Timestamp.fromDate(startAt),
        createdAt: serverTimestamp(),
    });

    return docRef.id;
};

// READ
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
            signupUrl,
        } = d.data() as any;

        const props: ActivityProps = {
            title,
            description,
            date: startAt ? startAt.toDate() : new Date(), // 🔹 siempre Date
            location,
            capacity,
            attendeesCount,
            requiresSignup,
            posterUrl: posterUrl ?? undefined,
            instagramUrl: instagramUrl ?? undefined,
            signupUrl: signupUrl ?? undefined,
        };

        return { id: d.id, data: props };
    });
};

// UPDATE
export const updateActivity = async (
    id: string,
    input: UpdateActivityInput
) => {
    const startAt =
        input.date && input.time
            ? combineDateTime(input.date, input.time)
            : undefined;

    const payload: Record<string, unknown> = {
        ...input,
        ...(startAt ? { startAt: Timestamp.fromDate(startAt) } : {}),
    };

    Object.keys(payload).forEach((k) => {
        if (payload[k] === undefined) delete payload[k];
    });

    await setDoc(doc(db, "activities", id), payload, { merge: true });
};

// DELETE
export const deleteActivity = async (id: string) => {
    const docRef = doc(db, "activities", id);
    await deleteDoc(docRef);
};
