import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase/firebase-config";

export const auth = getAuth(app);
