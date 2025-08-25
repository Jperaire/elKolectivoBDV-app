import {
    CalendarLogo,
    CanvaLogo,
    DriveLogo,
    MeetLogo,
    WhatsAppLogo,
} from "../../../../assets/images";

import { LinkItem, EntityInfo } from "./types";

export const LINKS: readonly LinkItem[] = [
    {
        id: "canva",
        title: "Canva",
        icon: CanvaLogo,
        link: "https://www.canva.com/folder/FAFiqx_Pu0Y",
    },
    {
        id: "calendar",
        title: "Google Calendar",
        icon: CalendarLogo,
        link: "https://calendar.google.com/calendar/embed?src=elkolectivobdv%40gmail.com&ctz=Europe%2FMadrid",
        linksExtra: {
            ical: "https://calendar.google.com/calendar/ical/elkolectivobdv%40gmail.com/public/basic.ics",
        },
    },

    {
        id: "drive",
        title: "Google Drive",
        icon: DriveLogo,
        link: "https://drive.google.com/drive/folders/1MXeDkc8cjplYMJ9p0QjCfjNB8NLws2dc?usp=drive_link",
    },
    {
        id: "whatsapp",
        title: "Comunitat WhatsApp",
        icon: WhatsAppLogo,
        link: "https://chat.whatsapp.com/EKjktAzP1ZwJ4b6ySjSkxr",
    },
    {
        id: "meet",
        title: "Google Meet",
        icon: MeetLogo,
        link: "https://meet.jit.si/ass_kolectivo_bdv",
    },
] as const;

export const ENTITY: Readonly<EntityInfo> = {
    name: "ASSOCIACIÓ EL KOLECTIVO BDV",
    nif: "G56693187",
    address: "C/ Via Sant Oleguer, 6, 08210 Barberà del Vallès, Barcelona",
} as const;
