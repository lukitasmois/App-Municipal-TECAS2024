import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function VerFormulario() {
  const { idFormulario } = useParams();
  const [formulario, setFormulario] = useState({});

  const fetchFormulario = async () => {
    const respuesta = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/respuestaformularios/${idFormulario}`,
      { credentials: "include" }
    );
    const formulario = await respuesta.json();
    setFormulario(formulario);
    console.log(formulario);
  };

  useEffect(() => {
    fetchFormulario();
  }, []);

  const mostrarRespuestas = () => {
    if (formulario.respuestas !== undefined) {
      let componentes = formulario.respuestas.map((respuesta, index) => {
        if (respuesta.etiqueta === "Terminos y Condiciones") {
          return (
            <h3 key={index}>
              {respuesta.etiqueta}: {respuesta.valor ? "Aceptado" : "Rechazado"}
            </h3>
          );
        }
        return (
          <h3 key={index}>
            {respuesta.etiqueta}: {respuesta.valor}
          </h3>
        );
      });

      return componentes;
    }
  };

  return (
    <>
      <div className="w-50 mx-auto">
        <h1 className="mb-3 text-center">
          Formulario:{" "}
          {formulario.idFormulario !== undefined
            ? formulario.idFormulario.nombreFormulario
            : ""}
        </h1>
        {mostrarRespuestas()}
      </div>
    </>
  );
}

export default VerFormulario;
