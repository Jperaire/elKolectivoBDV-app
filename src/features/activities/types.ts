export type ActivityForm = {
    title: string;
    date: string; // ISO yyyy-mm-dd
    time: string; // hh:mm
    location: string;
    description: string;
    requiresSignup: boolean;
    capacity: string;
    hasCapacity: boolean;
    instagramUrl: string;
    posterFile: File | null;
};

export type CapacityBadgeProps = {
    capacity?: number;
    attendeesCount?: number;
    className?: string;
};

export type ActivityProps = {
    title: string;
    description?: string;
    date: Date;
    location?: string;
    capacity?: number;
    attendeesCount?: number;
    requiresSignup?: boolean;
    posterUrl?: string;
    instagramUrl?: string;
};

export interface EditActivityModalProps {
    open: boolean;
    activity: { id: string; data: ActivityProps } | null;
    onClose: () => void;
    onUpdated: (id: string, newData: ActivityProps) => void;
}

export type UpdateActivityInput = Partial<{
    title: string;
    date: string; // yyyy-mm-dd
    time: string; // HH:mm
    location: string;
    description: string;
    requiresSignup: boolean;
    capacity: number | null;
    posterUrl: string | null;
    instagramUrl: string | null;
}>;
