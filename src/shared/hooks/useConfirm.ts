export const useConfirm = (defaultMessage = "Segur que vols continuar?") => {
    const confirm = (message?: string) =>
        window.confirm(message ?? defaultMessage);
    return { confirm };
};
