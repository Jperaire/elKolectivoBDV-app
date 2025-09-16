export type NavLink = { label: string; path: string };

export const BASE_LINKS: NavLink[] = [
    { label: "Activitats", path: "/activities" },
    { label: "Notícies", path: "/news" },
    { label: "Merchan", path: "/merch" },
];

export const USER_LINKS: NavLink[] = [
    { label: "El meu perfil", path: "/user" },
    { label: "quiz", path: "/user/quiz" },
];

export const ADMIN_LINKS: NavLink[] = [
    { label: "El meu perfil", path: "/user" },
];
