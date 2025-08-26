import { useState } from "react";

export const useForm = <T extends Record<string, unknown>>(initialForm: T) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, type } = target;
        const value = type === "checkbox" ? target.checked : target.value;
        setFormState((s) => ({ ...s, [name]: value }));
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    };
};
