import type { FieldValue, Timestamp } from "firebase/firestore";

export type Role = "user" | "admin";

export type LoginForm = { email: string; password: string };

export interface MembershipAnswers {
    [key: string]: string;
}

export interface AppUserData {
    uid: string;
    email: string | null;
    role: Role;
    displayName?: string | null;
    createdAt?: Timestamp;
    membershipTest?: {
        answers: MembershipAnswers;
        status: "pending" | "approved" | "rejected";
        submittedAt?: Timestamp | FieldValue;
    };
}

export type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};
