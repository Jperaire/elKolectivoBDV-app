import type { Timestamp } from "firebase/firestore";

export type Role = "user" | "admin";

export type LoginForm = { email: string; password: string };

export interface AppUserData {
    uid: string;
    email: string | null;
    role: Role;
    displayName?: string | null;
    createdAt?: Timestamp;
}

export type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};
