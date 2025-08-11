import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

import { AppUserData } from "../types";
import { updateProfile } from "firebase/auth";
import { auth } from "./auth";
import { db } from "../../firebase/firestore";

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

export async function updateUserProfile(
    uid: string,
    displayName: string,
    photoURL: string | null
) {
    if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
            displayName,
            photoURL: photoURL ?? undefined,
        });
    }
    await updateDoc(doc(db, "users", uid), {
        displayName,
        photoURL: photoURL ?? null,
    });
}
