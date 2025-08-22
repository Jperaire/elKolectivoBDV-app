export const authErrorMessage = (e: unknown): string => {
    const code = (e as { code?: string })?.code ?? "";

    switch (code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Email o contrasenya incorrectes.";
        case "auth/too-many-requests":
            return "Massa intents. Prova-ho més tard.";
        case "auth/email-already-in-use":
            return "Aquest email ja està registrat.";
        case "auth/invalid-email":
            return "Email no vàlid.";
        case "auth/weak-password":
            return "La contrasenya és massa dèbil.";
        default:
            return "S'ha produït un error. Torna-ho a intentar.";
    }
};
