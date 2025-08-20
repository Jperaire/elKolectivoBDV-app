export const navLinks = {
    public: [
        { label: "Calendari", path: "/calendar" },
        { label: "Notícies", path: "/news" },
        { label: "Merchan", path: "/merch" },
    ],
    user: [
        { label: "Calendari", path: "/calendar" },
        { label: "Notícies", path: "/news" },
        { label: "El meu perfil", path: "/user" },
        { label: "Donacions", path: "/user/donations" },
        { label: "Merchan", path: "/merchan" },
        { label: "Test", path: "/user/test" },
    ],
    admin: [
        { label: "Panell", path: "/admin" },
        { label: "Activitats", path: "/admin/activities" },
        { label: "Membres", path: "/admin/members" },
        { label: "Notícies", path: "/admin/news" },
        { label: "Tanca sessió", path: "/logout" },
    ],
} as const;
