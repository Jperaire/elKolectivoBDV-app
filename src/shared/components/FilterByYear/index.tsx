import styles from "./FilterByYear.module.css";

type FilterByYearProps = {
    selected: number | null;
    onSelect: (year: number) => void;
};

export const FilterByYear = ({ selected, onSelect }: FilterByYearProps) => {
    const years = [2025, 2024, 2023, 2022];

    return (
        <ul className={styles.filterByYear}>
            {years.map((year) => (
                <li
                    key={year}
                    className={year === selected ? styles.active : ""}
                    onClick={() => onSelect(year)}
                >
                    {year}
                </li>
            ))}
        </ul>
    );
};
