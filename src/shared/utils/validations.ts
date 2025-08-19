// ✅ helpers
const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

// ✅ register
export function validateRegister(v: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}): string | null {
    if (!v.userName.trim()) return "El nom és obligatori";
    if (!v.email.trim()) return "Introdueix el correu.";
    if (!isEmail(v.email)) return "Email no vàlid.";
    if (v.password.length < 6)
        return "La contrasenya ha de tenir mínim 6 caràcters.";
    if (v.password !== v.confirmPassword)
        return "Les contrasenyes no coincideixen";
    return null;
}

// ✅ login
export function validateLogin(v: {
    email: string;
    password: string;
}): string | null {
    if (!v.email.trim()) return "Introdueix el correu.";
    if (!isEmail(v.email)) return "Email no vàlid.";
    if (!v.password.trim()) return "Introdueix la contrasenya.";
    if (v.password.length < 6)
        return "La contrasenya ha de tenir mínim 6 caràcters.";
    return null;
}
