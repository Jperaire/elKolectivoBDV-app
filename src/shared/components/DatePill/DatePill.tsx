import { formatDateLabel } from "@/shared/utils";
import styles from "./DatePill.module.css";

interface DatePillProps {
    date: Date;
}

export const DatePill = ({ date }: DatePillProps) => {
    const label = formatDateLabel(date);

    return <span className={styles.datePill}>{label}</span>;
};
