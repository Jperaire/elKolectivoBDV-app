import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth";

export const loginWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};
