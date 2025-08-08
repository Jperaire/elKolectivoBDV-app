import { Outlet } from "react-router-dom";
export const AdminLayout = () => {
    return (
        <>
            <h1>admin navbar</h1>
            <main>
                <Outlet />
            </main>
            <h2>Footer</h2>
        </>
    );
};
