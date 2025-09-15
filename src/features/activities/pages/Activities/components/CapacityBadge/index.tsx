import { CapacityBadgeProps } from "@/features/activities/types";
import styles from "./CapacityBadge.module.css";

export const CapacityBadge = ({
    capacity,
    attendeesCount = 0,
    className = "",
}: CapacityBadgeProps) => {
    const hasCapacity = Number.isFinite(capacity) && (capacity as number) > 0;

    if (!hasCapacity) return null;

    const isFull = (attendeesCount ?? 0) >= (capacity as number);

    return (
        <span
            className={`${styles.badge} ${
                isFull ? styles.full : ""
            } ${className}`}
            data-full={isFull ? "true" : "false"}
            aria-live="polite"
        >
            {isFull ? "Full" : `${attendeesCount} / ${capacity}`}
        </span>
    );
};
