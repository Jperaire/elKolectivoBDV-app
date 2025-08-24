import {
    CalendarImg,
    InfoImg,
    MembersImg,
    NewsImg,
    MerchImg,
} from "../../../assets/images";

export const adminActionsData = [
    {
        title: "Membres",
        description:
            "Visualitza els membres de la comunitat i aprova les noves sol·licituds.",
        link: "/admin/members",
        img: MembersImg,
    },
    {
        title: "Activitats",
        description: "Crea, edita i elimina activitats.",
        link: "/admin/activities",
        img: CalendarImg,
    },
    {
        title: "Notícies",
        description: "Publica i edita les notícies de la comunitat.",
        link: "/admin/news",
        img: NewsImg,
    },
    {
        title: "Recursos",
        description: "Informació útil i links d'interès",
        link: "/admin/resources",
        img: InfoImg,
    },
    {
        title: "Merchan",
        description: "Consulta la llista d’espera.",
        link: "/admin/waitlist",
        img: MerchImg,
    },
];
