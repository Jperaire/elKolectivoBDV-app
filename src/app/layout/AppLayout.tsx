import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../shared/components";
import { navLinks } from "../../shared/config/nav";
import { useAuth } from "../../features/auth/hooks/useAuth";

export const AppLayout = () => {
    const { user, userData } = useAuth();

    const links =
        userData?.role === "admin"
            ? navLinks.admin
            : user
            ? navLinks.user
            : navLinks.public;

    return (
        <>
            <Navbar links={links} />

            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
