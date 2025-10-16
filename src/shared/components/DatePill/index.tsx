import { formatDateLabel } from "@/shared/utils";
import styles from "./DatePill.module.css";

interface DatePillProps {
    date: Date;
    showTime?: boolean;
}

export const DatePill = ({ date, showTime }: DatePillProps) => {
    const label = formatDateLabel(date, "ca-ES", showTime);

    return <span className={styles.datePill}>{label}</span>;
};
