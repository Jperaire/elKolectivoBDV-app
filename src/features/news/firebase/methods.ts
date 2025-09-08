import {
    addDoc,
    collection,
    query,
    orderBy,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { NewsProps } from "../types";

export const createNews = async (input: {
    title: string;
    body: string;
    imageUrl?: string;
}) => {
    await addDoc(collection(db, "news"), {
        title: input.title,
        body: input.body,
        imageUrl: input.imageUrl || null,
        createdAt: serverTimestamp(),
    });
};

export const getNewsOnce = async (): Promise<
    Array<{ id: string; data: NewsProps }>
> => {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
        const {
            title = "",
            body = "",
            imageUrl = null,
            createdAt,
        } = d.data() as {
            title?: string;
            body?: string;
            imageUrl?: string | null;
            createdAt?: { toDate: () => Date };
        };

        const props: NewsProps = {
            title,
            description: body,
            date: createdAt ? createdAt.toDate() : new Date(),
            imageUrl: imageUrl ?? undefined,
        };

        return { id: d.id, data: props };
    });
};
