import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../shared/components";
import { navLinks } from "../../shared/config/nav";
import { useContext } from "react";
import { AuthContext } from "../../features/auth/context/AuthContext";

type Variant = "public" | "private" | "admin";

export const AppLayout = () => {
    const { user, userData } = useContext(AuthContext);

    const variant: Variant =
        userData?.role === "admin" ? "admin" : user ? "private" : "public";
    return (
        <>
            <Navbar variant={variant} links={navLinks.public} />

            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

// TODO: useauth!!!!!
