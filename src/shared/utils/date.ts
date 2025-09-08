export const combineDateTime = (isoDate: string, hhmm: string) => {
    const [y, m, d] = (isoDate || "").split("-").map(Number);
    const [h, min] = (hhmm || "").split(":").map(Number);
    if (!y || !m || !d || Number.isNaN(h) || Number.isNaN(min)) {
        return null;
    }
    return new Date(y, m - 1, d, h, min, 0, 0);
};

export const normalizeDate = (date: string | Date): Date =>
    typeof date === "string" ? new Date(date) : date;
