import {
    doc,
    setDoc,
    serverTimestamp,
    collection,
    getDocs,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firestore";

export type WaitlistItem = {
    id: string;
    title: string;
    price: number;
};

export type WaitlistEntry = {
    uid: string;
    email: string;
    name: string;
    itemId: string;
    itemTitle: string;
    price: number;
    createdAt?: Date;
};

// 👉 apuntar un usuari
export const joinWaitlist = async (
    uid: string,
    item: WaitlistItem,
    email: string,
    name?: string
) => {
    const wid = `${uid}_${item.id}`;
    const ref = doc(db, "waitlist", wid);

    await setDoc(
        ref,
        {
            uid,
            email,
            name: name || "",
            itemId: item.id,
            itemTitle: item.title,
            price: item.price,
            createdAt: serverTimestamp(),
        },
        { merge: true }
    );
};

// 👉 treure un usuari
export const leaveWaitlist = async (uid: string, itemId: string) => {
    const wid = `${uid}_${itemId}`;
    const ref = doc(db, "waitlist", wid);
    await deleteDoc(ref);
};

// 👉 obtenir tots els docs (admin)
export const getAllWaitlist = async (): Promise<WaitlistEntry[]> => {
    const snap = await getDocs(collection(db, "waitlist"));
    return snap.docs.map((d) => {
        const data = d.data();
        return {
            uid: data.uid as string,
            email: data.email as string,
            name: (data.name as string) || "",
            itemId: data.itemId as string,
            itemTitle: data.itemTitle as string,
            price: data.price as number,
            createdAt: data.createdAt?.toDate?.(),
        };
    });
};
