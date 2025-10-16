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
    Timestamp,
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
        subtitle: input.subtitle,
        body: input.body,
        date: input.date,
        createdAt: serverTimestamp(),
    });
    return ref.id;
};

export const getNewsOnce = async (): Promise<
    Array<{ id: string; data: NewsProps }>
> => {
    const q = query(collection(db, "news"), orderBy("date", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
        const data = d.data();

        let formattedDate: Date;
        if (data.date instanceof Timestamp) {
            formattedDate = data.date.toDate();
        } else if (typeof data.date === "string") {
            formattedDate = new Date(data.date);
        } else {
            formattedDate = new Date();
        }

        const props: NewsProps = {
            title: data.title ?? "",
            subtitle: data.subtitle ?? "",
            description: data.body ?? "",
            date: formattedDate,
            imageUrl: data.imageUrl ?? undefined,
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
