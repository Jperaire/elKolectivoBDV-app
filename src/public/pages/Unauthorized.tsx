import { Link } from "react-router-dom";

export const Unauthorized = () => (
    <div>
        <h1>Acceso no autorizado</h1>
        <p>No tienes permisos para ver esta sección.</p>
        <Link to="/">Volver al inicio</Link>
    </div>
);

// TODO: NO SE SI LE VOY A DAR USO??¿??
