import React from "react";

// Componente para mostrar el estado con una esfera y texto
const EstadoConEsfera = ( props ) => {
  const estiloEsfera = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: props.color,
    display: "inline-block",
    marginRight: "8px",
  };

  const estiloTexto = {
    fontSize: "14px",
    color: "#333",
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={estiloEsfera}></span>
      <span style={estiloTexto}>{props.texto}</span>
    </div>
  );
};
export default EstadoConEsfera;