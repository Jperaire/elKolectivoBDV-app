import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../shared/components";
import { navLinks } from "../../shared/config/nav";
import { useAuth } from "../../features/auth/hooks/useAuth";

type Variant = "public" | "private" | "admin";

export const AppLayout = () => {
    const { user, userData } = useAuth();

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
