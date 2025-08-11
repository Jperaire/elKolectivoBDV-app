import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../auth";

export function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
}
