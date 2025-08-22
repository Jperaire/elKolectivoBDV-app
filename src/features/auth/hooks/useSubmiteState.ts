// src/shared/hooks/useSubmitState.ts
import { useState } from "react";
import { authErrorMessage } from "../utils/authErrorMessage";

export const useSubmitState = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const reset = () => {
        setError(null);
        setSuccess(null);
    };
    const start = () => {
        reset();
        setSubmitting(true);
    };
    const stop = () => setSubmitting(false);

    const fail = (e: unknown) => setError(authErrorMessage(e));
    const ok = (msg?: string) => {
        if (msg) setSuccess(msg);
    };

    return {
        error,
        success,
        submitting,
        setError,
        setSuccess,
        start,
        stop,
        fail,
        ok,
        reset,
    };
};
