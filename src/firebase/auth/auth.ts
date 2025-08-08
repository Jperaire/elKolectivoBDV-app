import { getAuth } from "firebase/auth";
import { app } from "../firebase-Config";

export const auth = getAuth(app);
