import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
    return (
        <>
            <h1>user navbar</h1>
            <main>
                <Outlet />
            </main>
            <h2>Footer</h2>
        </>
    );
};
