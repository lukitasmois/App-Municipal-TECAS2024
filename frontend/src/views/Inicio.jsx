import IniciarSesion from "./usuario/IniciarSesion";

function Inicio({ usuarioLogeado }) {
  return (
    <>
      <h1>Bienvenido!</h1>
      {usuarioLogeado.logeado ? (
        <p>
          Bienvenido: {usuarioLogeado.usuario.nombre}{" "}
          {usuarioLogeado.usuario.apellido}!
        </p>
      ) : (
        <p>
          Inicia sesion para ingresar a la aplicacion <br /> <IniciarSesion />
        </p>
      )}
    </>
  );
}

export default Inicio;
