import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { ensureUserDoc } from "../../../../services/user-service";
import { auth } from "../auth";

export const loginWithEmail = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await ensureUserDoc(cred.user.uid, {
        email: cred.user.email,
        displayName: cred.user.displayName ?? null,
        photoURL: cred.user.photoURL ?? null,
    });
    return cred;
};
