import { useForm } from "../../../../shared/hooks/useForm";
import { useAuth, useSubmitState } from "../../hooks/";
import { validateRegister } from "../../../../shared/utils";
import { registerWithEmail } from "../../firebase/methods";
import { Button, Card } from "../../../../shared/components";

type RegisterForm = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterPage = () => {
    const { loading } = useAuth();

    const { error, success, submitting, start, stop, fail, ok } =
        useSubmitState();

    const {
        userName,
        email,
        password,
        confirmPassword,
        onInputChange,
        onResetForm,
    } = useForm<RegisterForm>({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return;

        const msg = validateRegister({
            userName,
            email,
            password,
            confirmPassword,
        });
        if (msg) {
            fail({ code: "", message: msg } as unknown);
            return;
        }

        try {
            start();
            await registerWithEmail(
                userName,
                email.trim().toLowerCase(),
                password
            );
            onResetForm();
            ok(
                "T'has registrat correctament 🎉. Revisa la teva bústia per verificar el teu email. Si no el trobes, revisa Spam o Promocions"
            );
        } catch (err: unknown) {
            fail(err);
        } finally {
            stop();
        }
    };

    if (loading) return <p>Carregant...</p>;

    return (
        <div className="page">
            <h1>Formulari de registre</h1>

            <Card>
                <section>
                    <form onSubmit={handleSubmit} noValidate>
                        {success ? (
                            <Button to="/" variant="button--blue">
                                Ves a l'inici
                            </Button>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Escriu el teu nom"
                                    value={userName}
                                    onChange={onInputChange}
                                    required
                                    autoComplete="name"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Escriu la teva adreça electrònica"
                                    value={email}
                                    onChange={onInputChange}
                                    required
                                    inputMode="email"
                                    autoComplete="email"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contrasenya"
                                    value={password}
                                    onChange={onInputChange}
                                    required
                                    minLength={6}
                                    autoComplete="new-password"
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirma la contrasenya"
                                    value={confirmPassword}
                                    onChange={onInputChange}
                                    required
                                    autoComplete="new-password"
                                />
                                <Button
                                    isLoading={submitting}
                                    loadingText="Creant compte..."
                                    variant="button--blue"
                                    type="submit"
                                >
                                    Registrar-se
                                </Button>
                            </>
                        )}
                    </form>
                    <div aria-live="polite" aria-atomic="true">
                        {error && <p className="error">⚠️ {error}</p>}
                        {success && <p className="success">{success}</p>}
                    </div>
                </section>
            </Card>
        </div>
    );
};
