import {
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider,
    reauthenticateWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../auth";

export async function deleteAccount(password?: string) {
    const current = auth.currentUser;
    if (!current) throw new Error("No user signed in");

    const providerId = current.providerData[0]?.providerId;

    if (providerId === "password") {
        if (!current.email || !password) throw new Error("Password required");
        const cred = EmailAuthProvider.credential(current.email, password);
        await reauthenticateWithCredential(current, cred);
    } else if (providerId === "google.com") {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(current, provider);
    } else {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(current, provider);
    }

    await deleteUser(current);
}
