export const getMapHref = (location?: string) =>
    location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
          )}`
        : undefined;

export const isActivityFull = (capacity?: number, attendeesCount = 0) =>
    Number.isFinite(capacity) ? attendeesCount >= (capacity ?? 0) : false;
