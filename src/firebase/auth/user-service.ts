import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firestore";

import { AppUser } from "../../types/user";

export const createUserInFirestore = async (uid: string, data: AppUser) => {
    const ref = doc(db, "users", uid);
    await setDoc(ref, { ...data, createdAt: Date.now() }, { merge: true });
};

export const getUserFromFirestore = async (uid: string) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as AppUser) : null;
};
