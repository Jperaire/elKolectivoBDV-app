import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firestore";
import { AppUserData } from "../../types/user";

export const createUserInFirestore = async (
    uid: string,
    data: Partial<AppUserData>
) => {
    const ref = doc(db, "users", uid);
    await setDoc(
        ref,
        { ...data, createdAt: serverTimestamp() },
        { merge: true }
    );
};

export const getUserFromFirestore = async (uid: string) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as AppUserData) : null;
};

export async function ensureUserDoc(uid: string, data: Partial<AppUserData>) {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
        await setDoc(ref, {
            ...data,
            role: "user",
            createdAt: serverTimestamp(),
        });
    }
}
