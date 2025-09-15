import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "@/features/auth/firebase/methods";
import { useConfirm } from "@/shared/hooks";

export const useLogout = () => {
    const [loggingOut, setLoggingOut] = useState(false);
    const navigate = useNavigate();
    const { confirm } = useConfirm("Segur que vols tancar la sessió?");

    const logout = async () => {
        if (!confirm()) return;

        try {
            setLoggingOut(true);
            await signOutUser();
            navigate("/");
        } finally {
            setLoggingOut(false);
        }
    };

    return { logout, loggingOut };
};
