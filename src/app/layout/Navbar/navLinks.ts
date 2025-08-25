export type NavLink = { label: string; path: string };

export const BASE_LINKS: NavLink[] = [
    { label: "Calendari", path: "/calendar" },
    { label: "Notícies", path: "/news" },
    { label: "Merchan", path: "/merch" },
];

export const USER_LINKS: NavLink[] = [
    { label: "El meu perfil", path: "/user" },
    { label: "Test", path: "/user/test" },
];

export const ADMIN_LINKS: NavLink[] = [
    { label: "El meu perfil", path: "/user" },
];
