import {
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";

export type ActivityAttendee = { uid: string; email: string; name?: string };
const COLL = "activities";

export const addAttendee = async (
    activityId: string,
    attendee: ActivityAttendee
) => {
    const ref = doc(db, COLL, activityId);
    await updateDoc(ref, { attendees: arrayUnion(attendee) });
};

export const removeAttendee = async (
    activityId: string,
    attendee: ActivityAttendee
) => {
    const ref = doc(db, COLL, activityId);
    await updateDoc(ref, { attendees: arrayRemove(attendee) });
};

export const isUserAttending = async (activityId: string, uid: string) => {
    const ref = doc(db, COLL, activityId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return false;
    const list = (snap.data().attendees as ActivityAttendee[]) || [];
    return list.some((a) => a.uid === uid);
};

export const getAttendees = async (activityId: string) => {
    const ref = doc(db, COLL, activityId);
    const snap = await getDoc(ref);
    return snap.exists()
        ? (snap.data().attendees as ActivityAttendee[]) || []
        : [];
};
