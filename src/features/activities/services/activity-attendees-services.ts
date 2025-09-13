import {
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import type { ActivityAttendee } from "../types";

const COLL = "activities";

export const addAttendee = async (
    activityId: string,
    attendee: ActivityAttendee
) => {
    await updateDoc(doc(db, COLL, activityId), {
        attendees: arrayUnion(attendee),
    });
};

export const removeAttendee = async (
    activityId: string,
    attendee: ActivityAttendee
) => {
    await updateDoc(doc(db, COLL, activityId), {
        attendees: arrayRemove(attendee),
    });
};

export const isUserAttending = async (activityId: string, uid: string) => {
    const snap = await getDoc(doc(db, COLL, activityId));
    if (!snap.exists()) return false;
    const list = (snap.data().attendees as ActivityAttendee[]) || [];
    return list.some((a) => a.uid === uid);
};

export const getAttendees = async (activityId: string) => {
    const snap = await getDoc(doc(db, COLL, activityId));
    return snap.exists()
        ? (snap.data().attendees as ActivityAttendee[]) || []
        : [];
};
