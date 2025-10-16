export type NewsForm = {
    title: string;
    subtitle: string;
    body: string;
    imageFile?: File | null;
};

export interface NewsProps {
    id?: string;
    title: string;
    subtitle: string;
    description: string;
    date: Date;
    imageUrl?: string;
    onReadMore?: () => void;
}

export interface CreateNewsModalProps {
    open: boolean;
    onClose: () => void;
    onCreated: (row: { id: string; data: NewsProps }) => void;
}

export type UpdateNewsInput = Partial<{
    title: string;
    subtitle: string;
    body: string;
    imageUrl: string | null;
}>;

export interface EditNewsModalProps {
    open: boolean;
    news: { id: string; data: NewsProps } | null;
    onClose: () => void;
    onUpdated: (id: string, data: NewsProps) => void;
}
