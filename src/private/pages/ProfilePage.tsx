import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { updateUserProfile } from "../../auth/firebase/user-service";
import { deleteAccount } from "../../auth/firebase/methods";

export const ProfilePage = () => {
    const { user, userData, logout } = useContext(AuthContext);
    const [displayName, setDisplayName] = useState(userData?.displayName ?? "");
    const [photoURL, setPhotoURL] = useState(userData?.photoURL ?? "");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    if (!user) return <p>No estás logueado</p>;

    const handleUpdate = async () => {
        try {
            await updateUserProfile(user.uid, displayName, photoURL || null);
            setStatus("Perfil actualizado");
        } catch (err) {
            console.error(err);
            setStatus("Error al actualizar");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que quieres borrar tu cuenta?")) return;
        try {
            await deleteAccount(password);
            setStatus("Cuenta eliminada");
        } catch (err) {
            console.error(err);
            setStatus("Error al eliminar cuenta");
        }
    };

    const handleClose = async () => {
        if (!window.confirm("¿Seguro que quieres cerrar tu sesión?")) return;
        try {
            await logout();
            setStatus("Sesión cerrada");
        } catch (err) {
            console.error(err);
            setStatus("Error al cerrar sesión");
        }
    };

    return (
        <main style={{ padding: 20 }}>
            <h1>Mi perfil</h1>
            <div>
                <label>Nombre</label>
                <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </div>
            <div>
                <label>Foto (URL)</label>
                <input
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                />
            </div>
            <button onClick={handleUpdate}>Actualizar perfil</button>

            <hr />
            <h2>Borrar cuenta</h2>
            <p>Introduce tu contraseña para confirmar</p>
            <input
                type="password"
                placeholder="Contraseña actual"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleDelete}>Eliminar cuenta</button>

            <hr />
            <h2>Cerrar sesión</h2>
            <button onClick={handleClose}>Cerrar sesión</button>

            {status && <p>{status}</p>}
        </main>
    );
};
