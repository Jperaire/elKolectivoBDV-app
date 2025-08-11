import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../auth";

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // TODO: TAMBIÉN HABRÍA QUE REGISTRARLO EN FIREBASE?¿?
    return await signInWithPopup(auth, provider);
};
