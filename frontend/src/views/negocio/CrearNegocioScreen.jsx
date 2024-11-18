import Contenedor from "../../components/Contenedor";
import CrearNegocioForm from "./CrearNegocioForm";
import { useAuthContext } from "../../context/AuthContext";
import SpinnerCargando from "../../components/SpinnerCargando";

function CrearNegocio() {
  const { usuarioLogeado, cargando } = useAuthContext();

  if (cargando) {
    return <SpinnerCargando />;
  }

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
