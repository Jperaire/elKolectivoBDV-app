import emailjs from "@emailjs/browser";

export type EmailData = {
    name: string;
    email: string;
    message: string;
};

export const sendEmail = async (data: EmailData) => {
    return emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
};
