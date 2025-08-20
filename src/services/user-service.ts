import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

import { AppUserData, MembershipAnswers } from "../features/auth/types";
import { updateProfile } from "firebase/auth";

import { db } from "../firebase/firestore";
import { auth } from "../features/auth/firebase/auth";

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

export async function saveMembershipTest(
    uid: string,
    answers: MembershipAnswers
) {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, {
        membershipTest: {
            answers,
            status: "pending",
            submittedAt: serverTimestamp(),
        },
    });
}

export async function approveMembership(uid: string) {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, {
        role: "member",
        "membershipTest.status": "approved",
    });
}

export async function rejectMembership(uid: string) {
    const ref = doc(db, "users", uid);
    await updateDoc(ref, {
        "membershipTest.status": "rejected",
    });
}
