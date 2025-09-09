export const fmtEUR = new Intl.NumberFormat("ca-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
});

const toDate = (input: string | Date) =>
    typeof input === "string" ? new Date(input) : input;

/** "6 d’octubre 2025 · 18:30" */
export const formatDateLabel = (input: string | Date, locale = "ca-ES") => {
    const d = toDate(input);

    const datePart = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(d);

    const timePart = new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
    }).format(d);

    return `${datePart} · ${timePart}h`;
};

export const isPast = (input: string | Date) =>
    toDate(input).getTime() < Date.now();
