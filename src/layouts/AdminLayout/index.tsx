import { Outlet } from "react-router-dom";
import { Navbar } from "../../shared/components";
import { navLinks } from "../../shared/config/nav";
export const AdminLayout = () => {
    return (
        <>
            <Navbar variant="admin" links={navLinks.admin} />
            <main>
                <Outlet />
            </main>
            <h2>Footer</h2>
        </>
    );
};
