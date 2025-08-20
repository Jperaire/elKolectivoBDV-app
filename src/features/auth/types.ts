import type { Timestamp } from "firebase/firestore";

export type Role = "user" | "admin";

export interface MembershipAnswers {
    [key: string]: string;
}

export interface AppUserData {
    email: string | null;
    role: Role;
    displayName?: string | null;
    photoURL?: string | null;
    createdAt?: Timestamp;
    membershipTest?: {
        answers: MembershipAnswers;
        status: "pending" | "approved" | "rejected";
        submittedAt: Timestamp;
    };
}
