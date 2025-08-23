import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../shared/components";

export const AppLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
