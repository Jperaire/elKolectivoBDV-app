import { useState } from "react";

export const useForm = <T extends Record<string, unknown>>(initialForm: T) => {
    const [formState, setFormState] = useState(initialForm);
    const [fileKey, setFileKey] = useState(0);

    const onInputChange = (
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
    };

    const onResetForm = () => {
        setFormState(initialForm);
        setFileKey((k) => k + 1);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        fileKey,
    };
};
