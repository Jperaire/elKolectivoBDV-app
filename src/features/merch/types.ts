export type WaitlistItem = {
    id: string;
    title: string;
    price: number;
};

export type WaitlistEntry = {
    uid: string;
    email: string;
    name: string;
    itemId: string;
    itemTitle: string;
    price: number;
    createdAt?: Date;
};

export type Item = {
    id: string;
    title: string;
    price: number;
    img?: string;
};
