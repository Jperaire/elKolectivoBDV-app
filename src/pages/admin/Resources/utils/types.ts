export type EntityInfo = {
    name: string;
    nif: string;
    address: string;
};

export type LinkItem = {
    id: string;
    title: string;
    icon: string;
    link: string;
    linksExtra?: {
        ical?: string;
        [key: string]: string | undefined;
    };
};

export interface LinkCardProps {
    resource: LinkItem;
}
