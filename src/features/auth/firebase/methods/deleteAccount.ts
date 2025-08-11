import {
    deleteUser,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../auth";

export async function deleteAccount(password: string) {
    if (!auth.currentUser?.email) throw new Error("No user signed in");

    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await deleteUser(auth.currentUser);
}
