import React from "react";
import axios from "axios";
const handleHabilitar = async (id) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/habilitaciones/crear",
      {
        idNegocio: id,
      }
    );
    console.log("Habilitación creada:", response.data);
    alert("Habilitación creada exitosamente");
  } catch (error) {
    alert("Hubo un error al crear la habilitación" + id);
  }
};
const ListaNegocios = ({ business }) => {
  return (
    <tr className="datos-negocio">
      <td>{business._id}</td>
      <td>{business.calle}</td>
      <td>{business.ciudad}</td>
      <td>{business.altura}</td>
      <td>{business.rubro}</td>
      <td>
        <button
          onClick={() => handleHabilitar(business._id)}
          className="custom-button"
        >
          Habilitar
        </button>
      </td>
    </tr>
  );
};

export default ListaNegocios;
