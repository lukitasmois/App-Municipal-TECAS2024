import Contenedor from "../../components/Contenedor";
import CrearNegocioForm from "./CrearNegocioForm";

function CrearNegocio({ usuarioLogeado }) {
  return (
    <>
      <h1>Crear Negocio</h1>
      <div className="contenedor-form">
        <Contenedor>
          <CrearNegocioForm usuarioLogeado={usuarioLogeado} />
        </Contenedor>
      </div>
    </>
  );
}

export default CrearNegocio;
