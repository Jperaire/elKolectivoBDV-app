import emailjs from "@emailjs/browser";

export type EmailData = {
    name: string;
    email: string;
    message: string;
};

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendEmail = async (data: EmailData) => {
    return emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        PUBLIC_KEY
    );
};
