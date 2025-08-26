import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./storage";

export const getFileUrl = async (path: string) => {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
};
