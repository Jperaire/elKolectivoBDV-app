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
