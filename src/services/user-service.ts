import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import type { AppUserData } from "../features/auth/types";

export async function getUser(uid: string): Promise<AppUserData | null> {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? (snap.data() as AppUserData) : null;
}

export async function createUser(uid: string, data: Partial<AppUserData>) {
    await setDoc(doc(db, "users", uid), {
        uid,
        role: "user",
        createdAt: serverTimestamp(),
        ...data,
    } as Partial<AppUserData>);
}

export async function ensureUser(uid: string, data: Partial<AppUserData>) {
    const existing = await getUser(uid);
    if (!existing) {
        await createUser(uid, data);
    }
}

export async function updateUser(uid: string, data: Partial<AppUserData>) {
    await updateDoc(doc(db, "users", uid), data);
}

export async function approveMembership(uid: string) {
    await updateDoc(doc(db, "users", uid), {
        "membershipTest.status": "approved",
    });
}

export async function rejectMembership(uid: string) {
    await updateDoc(doc(db, "users", uid), {
        "membershipTest.status": "rejected",
    });
}
