import {
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signOut,
} from "firebase/auth";
import { auth } from "../auth";
import { createUser } from "../../../../shared/services/";

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
    await sendEmailVerification(user);

    await createUser(user.uid, {
        email: user.email ?? email,
        role: "user",
        displayName: name,
    });

    await signOut(auth);
};
