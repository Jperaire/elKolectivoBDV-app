import { useState } from "react";
import { authErrorMessage } from "../utils/authErrorMessage";

export const useSubmitState = () => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const start = () => {
        setSubmitting(true);
        setError(null);
        setSuccess(null);
    };

    const stop = () => {
        setSubmitting(false);
    };

    const ok = (msg?: string) => {
        setSubmitting(false);
        setError(null);
        setSuccess(msg ?? null);
    };

    const fail = (e: unknown) => {
        setSubmitting(false);
        setError(authErrorMessage(e));
    };

    const failWithMessage = (msg: string) => {
        setSubmitting(false);
        setError(msg);
    };

    const reset = () => {
        setSubmitting(false);
        setError(null);
        setSuccess(null);
    };

    return {
        submitting,
        error,
        success,
        start,
        stop,
        ok,
        fail,
        failWithMessage,
        reset,
        setError,
    };
};
