import React from "react";

const ListaNegocios = ({ business, onEnable }) => {
  const handleEnable = () => {

    onEnable(business.id);
  };

  return (
    <tr>
      <td>{business.name}</td>
      <td>{business.description}</td>
      <td>{business.location}</td>
      <td>{business.status}</td>
      <td>
        {/* Botón habilitar */}
        <button onClick={handleEnable}>Habilitar</button>
      </td>
    </tr>
  );
};

export default ListaNegocios;


