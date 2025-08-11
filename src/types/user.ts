export interface AppUserData {
    email: string;
    role: "user" | "admin";
    displayName?: string | null;
    photoURL?: string | null;
    createdAt?: number;
}
