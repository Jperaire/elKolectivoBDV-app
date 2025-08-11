export const navLinks = {
    public: [
        { label: "Calendari", path: "/calendar" },
        { label: "Notícies", path: "/news" },
        { label: "Contacte", path: "/contact" },
    ],
    private: [
        { label: "El meu perfil", path: "/user/profile" },
        { label: "Donacions", path: "/user/donations" },
        { label: "Tanca sessió", path: "/logout" },
    ],
    admin: [
        { label: "Panell", path: "/admin" },
        { label: "Activitats", path: "/admin/activities" },
        { label: "Membres", path: "/admin/members" },
        { label: "Notícies", path: "/admin/news" },
        { label: "Tanca sessió", path: "/logout" },
    ],
} as const;
