export const getGoogleCalendarUrl = (
    title: string,
    date: Date,
    location?: string
) => {
    const start = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end =
        new Date(date.getTime() + 60 * 60 * 1000) // +1h
            .toISOString()
            .replace(/[-:]/g, "")
            .split(".")[0] + "Z";
    const details = encodeURIComponent(title);
    const loc = location ? encodeURIComponent(location) : "";
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${details}&dates=${start}/${end}&location=${loc}`;
};

export const downloadICS = (title: string, date: Date, location?: string) => {
    const dtStart = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const dtEnd =
        new Date(date.getTime() + 60 * 60 * 1000)
            .toISOString()
            .replace(/[-:]/g, "")
            .split(".")[0] + "Z";

    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${dtStart}
DTEND:${dtEnd}
${location ? `LOCATION:${location}` : ""}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
