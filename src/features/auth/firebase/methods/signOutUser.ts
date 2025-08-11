import { signOut } from "firebase/auth";
import { auth } from "../auth";

export const signOutUser = (): Promise<void> => signOut(auth);
