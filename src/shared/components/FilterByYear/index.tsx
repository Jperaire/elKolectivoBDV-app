import { useId, useState } from "react";
import styles from "./FilterByYear.module.css";
import { FilterIcon } from "@/assets/images";

type FilterByYearProps = {
    selected: number | null;
    onSelect: (year: number) => void;
    startOpen?: boolean;
};

export const FilterByYear = ({
    selected,
    onSelect,
    startOpen = false,
}: FilterByYearProps) => {
    const [open, setOpen] = useState(startOpen);
    const panelId = useId();
    const years = [2025, 2024, 2023, 2022];

    const handleSelect = (year: number) => {
        onSelect(year);
        setOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
                title="Filtrar per any"
            >
                <img
                    src={FilterIcon}
                    alt=""
                    aria-hidden="true"
                    className={styles.icon}
                />
                <span className={styles.triggerLabel}>Filtrar per any</span>
            </button>

            <div
                id={panelId}
                className={`${styles.collapse} ${open ? styles.open : ""}`}
                aria-hidden={!open}
            >
                <ul className={styles.filterByYear}>
                    {years.map((year) => (
                        <li
                            key={year}
                            className={year === selected ? styles.active : ""}
                            onClick={() => handleSelect(year)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ")
                                    handleSelect(year);
                            }}
                        >
                            {year}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
