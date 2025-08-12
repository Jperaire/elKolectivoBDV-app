import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../shared/components";
import { navLinks } from "../../shared/config/nav";

export const PrivateLayout = () => {
    return (
        <>
            <Navbar variant="public" links={navLinks.public} />

            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
