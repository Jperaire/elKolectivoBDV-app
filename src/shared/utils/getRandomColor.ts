export const getRandomColor = (colors: string[]): string => {
    return colors[Math.floor(Math.random() * colors.length)];
};
