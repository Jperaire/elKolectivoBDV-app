export type ActivityForm = {
    title: string;
    date: string; // ISO yyyy-mm-dd
    time: string; // hh:mm
    location: string;
    description: string;
};

export type CapacityBadgeProps = {
    capacity?: number;
    attendeesCount?: number;
    className?: string;
};

export type ActivityProps = {
    title: string;
    description?: string;
    date: string | Date; // p.ej. "2025-10-06T18:30:00+02:00"
    endDate?: string | Date;
    location?: string;
    type?: string;
    capacity?: number;
    attendeesCount?: number;
    requiresSignup?: boolean;
    className?: string;
    isRegistered?: boolean;
};
