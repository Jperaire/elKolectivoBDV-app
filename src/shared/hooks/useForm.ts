import { useState, ChangeEvent } from "react";

export const useForm = <T extends Record<string, unknown>>(initialForm: T) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
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
