import React, { useState } from "react";

const TablaHabilitaciones = ({ habilitacion }) => {
  console.log(habilitacion);

  return (
    <>
      <h2>Habilitación ID {habilitacion.idHabilitacion}</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Legajo</th>
            <th scope="col">Expediente</th>
            <th scope="col">Estado</th>
            <th scope="col">Vence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{habilitacion.NroLegajo}</td>
            <td>{habilitacion.numExpediente}</td>
            <td>{habilitacion.estado}</td>
            <td>{habilitacion.vencimiento}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const VistaHabilitaciones = () => {
  const [inputValue, setInputValue] = useState([]);
  const [habilitacionesArray, sethabilitacionesArray] = useState([]);

  // MANEJA EL CAMBIO DE INPUT EN EL BUSCADOR

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // HACE LA CONSULTA A LA API

  async function traerHabilitaciones() {
    const habilitaciones = await fetch(
      `${import.meta.env.VITE_API_URL}/api/habilitaciones/legajo/${inputValue}`
    );
    const hab_fetch = await habilitaciones.json();
    alert(hab_fetch[0].NroLegajo);
    sethabilitacionesArray(hab_fetch);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    traerHabilitaciones();
  };

  if (habilitacionesArray.length === 0) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h3>Búsqueda por legajo:</h3>
            <small id="emailHelp" className="form-text text-muted">
              Ingrese numero de legajo.
            </small>
            <input
              type="number"
              value={inputValue}
              onChange={handleChange}
              className="form-control"
            ></input>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <>
        <TablaHabilitaciones
          habilitacion={habilitacionesArray[0]}
        ></TablaHabilitaciones>
      </>
    );
  }
};

const MiFormulario = () => {
  // Define el estado para el input
  const [inputValue, setInputValue] = useState("");

  // Maneja los cambios en el input
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene la acción predeterminada del formulario
    console.log("Valor del input:", inputValue); // Aquí puedes hacer lo que necesites con el valor del input
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default VistaHabilitaciones;
