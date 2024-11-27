import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import SpinnerCargando from "../../components/SpinnerCargando";

function MostrarFormularios({ formularios }) {
  const mostrarFormularios = () => {
    let filas;
    if (formularios !== undefined) {
      filas = formularios.map((formulario, index) => {
        return (
          <tr key={index}>
            <td>{formulario.idFormulario.nombreFormulario}</td>
            <td>{formulario.estado}</td>
            <td>
              <Link
                to={`/verformulario/${formulario._id}`}
                className="btn btn-info ms-3 me-3"
              >
                Ver Formulario
              </Link>
              <Link
                to={`/editarformulario/${formulario._id}`}
                className="btn btn-warning ms-3 me-3"
              >
                Editar Formulario
              </Link>
              <button className="btn btn-danger ms-3 me-3">Exportar PDF</button>
            </td>
          </tr>
        );
      });
    }

    return filas;
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Formulario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{mostrarFormularios()}</tbody>
      </table>
    </div>
  );
}

function VerHabilitacion() {
  const [habilitacion, setHabilitacion] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  const fetchHabilitacion = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/habilitaciones/${id}`
      );
      const reshabilitacion = await response.json();
      setHabilitacion(reshabilitacion);
      console.log(reshabilitacion);
    } catch (error) {
      console.error("Error al obtener la habilitación:", error);
      toast.error("Error al ver la habilitación, intente nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchHabilitacion();
  }, []);

  if (cargando) {
    return <SpinnerCargando />;
  }

  return (
    <>
      <h1 className="text-center">Ver Habilitacion</h1>
      <div className="w-50 m-auto mt-4">
        <div className="text-center mt-3">
          <p>Id: {habilitacion._id}</p>
          <p>Legajo: {habilitacion.NroLegajo}</p>
          <p>Expediente: {habilitacion.numExpediente}</p>
          <p>Estado: {habilitacion.estado}</p>
          <p>Vence: {habilitacion.vencimiento}</p>

          <h3 className="text-center">Formularios</h3>
          <MostrarFormularios formularios={habilitacion.formularios} />
        </div>
      </div>
    </>
  );
}

export default VerHabilitacion;
