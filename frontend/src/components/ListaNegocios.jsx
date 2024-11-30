import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <tr>
      <td className="celda-negocio">{business._id}</td>
      <td className="celda-negocio">{business.calle}</td>
      <td className="celda-negocio">{business.ciudad}</td>
      <td className="celda-negocio">{business.altura}</td>
      <td className="celda-negocio">{business.rubro}</td>
      <td className="celda-negocio">
        <button
          onClick={() => handleHabilitar(business._id)}
          className="button-25"
        >
          Habilitar
        </button>
      </td>
      <td className="celda-negocio">
        <button
          onClick={() => navigate(`/vernegocio/${business._id}`)}
          className="button-25"
        >
          Ver
        </button>
      </td>
    </tr>
  );
};

export default ListaNegocios;
