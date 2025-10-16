import {
    addDoc,
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
import { NewsProps, UpdateNewsInput } from "../types";

export const createNews = async (input: {
    title: string;
    subtitle: string;
    body: string;
    imageUrl?: string;
    date: Date;
}) => {
    const ref = await addDoc(collection(db, "news"), {
        title: input.title,
        body: input.body,
        date: input.date,
        createdAt: serverTimestamp(),
    });
    return ref.id;
};

export const getNewsOnce = async (): Promise<
    Array<{ id: string; data: NewsProps }>
> => {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
        const {
            title = "",
            subtitle = "",
            body = "",
            imageUrl = null,
            createdAt,
        } = d.data() as {
            title?: string;
            subtitle?: string;
            body?: string;
            imageUrl?: string | null;
            createdAt?: { toDate: () => Date };
        };

        const props: NewsProps = {
            title,
            subtitle,
            description: body,
            date: createdAt ? createdAt.toDate() : new Date(),
            imageUrl: imageUrl ?? undefined,
        };

        return { id: d.id, data: props };
    });
};

export const updateNews = async (id: string, input: UpdateNewsInput) => {
    const payload: Record<string, unknown> = { ...input };
    Object.keys(payload).forEach(
        (k) => payload[k] === undefined && delete payload[k]
    );
    await setDoc(doc(db, "news", id), payload, { merge: true });
};

export const deleteNews = async (id: string) => {
    await deleteDoc(doc(db, "news", id));
};
