import { Outlet } from "react-router-dom";
import { Footer } from "../../shared/components/Footer/Footer";
import { Navbar } from "../../shared/components/Navbar";
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
