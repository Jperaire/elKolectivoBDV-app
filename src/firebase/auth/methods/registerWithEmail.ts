import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth";
import { createUserInFirestore } from "../user-service";

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
