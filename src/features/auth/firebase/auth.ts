import { getAuth } from "firebase/auth";
import { app } from "@/firebase/firebase-config";

export const auth = getAuth(app);
