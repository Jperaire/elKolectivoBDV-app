export type NewsForm = {
    title: string;
    body: string;
    imageFile?: File | null;
};

export interface NewsProps {
    id?: string;
    title: string;
    description: string;
    date: Date;
    imageUrl?: string;
    onReadMore?: () => void;
}
