import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../auth";
import { createUserInFirestore } from "../user-service";

export const registerWithEmail = async (
    name: string,
    email: string,
    password: string
) => {
    const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(user, { displayName: name });

    await createUserInFirestore(user.uid, {
        email: user.email ?? email,
        role: "user",
        displayName: name,
        photoURL: user.photoURL ?? null,
    });
    return user;
};
