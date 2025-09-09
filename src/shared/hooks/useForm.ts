import { useCallback, useRef, useState } from "react";

export const useForm = <T extends Record<string, unknown>>(initialForm: T) => {
    const [formState, setFormState] = useState(initialForm);
    const [fileKey, setFileKey] = useState(0);

    const initialRef = useRef(initialForm);

    const onInputChange = useCallback(
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            const target = e.target as HTMLInputElement;
            const { name, type } = target;

            if (type === "file") {
                setFormState((s) => ({
                    ...s,
                    [name]: (target.files?.[0] ?? null) as unknown,
                }));
                return;
            }

            const value = type === "checkbox" ? target.checked : target.value;
            setFormState((s) => ({ ...s, [name]: value }));
        },
        []
    );

    const onResetForm = useCallback(() => {
        setFormState(initialRef.current);
        setFileKey((k) => k + 1);
    }, []);

    const setForm = useCallback((newState: Partial<T>) => {
        setFormState((s) => ({ ...s, ...newState }));
        setFileKey((k) => k + 1);
    }, []);

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        setForm,
        fileKey,
    };
};
