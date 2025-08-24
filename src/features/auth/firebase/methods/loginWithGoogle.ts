import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ensureUser } from "../../../../services/user-service";
import { auth } from "../auth";

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await ensureUser(cred.user.uid, {
        email: cred.user.email,
        displayName: cred.user.displayName ?? null,
    });
    return cred;
};
