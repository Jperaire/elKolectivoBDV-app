import { useState } from "react";

export const useYearFilter = <T extends { date: string | Date }>(
    items: Array<{ id: string; data: T }>,
    initialYear = new Date().getFullYear()
) => {
    const [year, setYear] = useState<number>(initialYear);

    const filtered = year
        ? items.filter(({ data }) =>
              typeof data.date === "string"
                  ? data.date.startsWith(year.toString())
                  : data.date instanceof Date &&
                    data.date.getFullYear() === year
          )
        : items;

    return { year, setYear, filtered };
};
