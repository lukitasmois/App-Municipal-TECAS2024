import { Link } from "react-router-dom";
import IniciarSesion from "./usuario/IniciarSesion";

function Inicio({ usuarioLogeado }) {
  return (
    <>
      <h1>Bienvenido!</h1>
      {usuarioLogeado.logeado ? (
        <div>
          <p>
            Bienvenido: {usuarioLogeado.usuario.nombre}{" "}
            {usuarioLogeado.usuario.apellido}!
          </p>
          <p>ID: {usuarioLogeado.usuario._id}</p>
          <Link to="/crearNegocio" className="nav-link">
            Crear Negocio
          </Link>
        </div>
      ) : (
        <div>
          <p>
            Inicia sesion para ingresar a la aplicacion <br />
          </p>
          <IniciarSesion />
        </div>
      )}
    </>
  );
}

export default Inicio;
