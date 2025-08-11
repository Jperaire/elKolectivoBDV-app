import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "./auth";
import { createUserInFirestore } from "./user-service";

// Login with Email
export const loginWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

// Register with Email
export const registerWithEmail = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    await createUserInFirestore(user.uid, {
        email: user.email ?? email,
        role: "user",
        displayName: user.displayName ?? null,
        photoURL: user.photoURL ?? null,
    });
    return user;
};

// Login with Google
export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // TODO: TAMBIÉN HABRÍA QUE REGISTRARLO EN FIREBASE?¿?
    return await signInWithPopup(auth, provider);
};
