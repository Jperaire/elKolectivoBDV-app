import type { Timestamp } from "firebase/firestore";

export type Role = "user" | "admin";

export interface AppUserData {
    email: string | null;
    role: Role;
    displayName: string | null;
    photoURL: string | null;
    createdAt?: Timestamp;
}
