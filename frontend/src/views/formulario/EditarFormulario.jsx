import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

function ResponderFormulario() {
  const { idFormulario } = useParams();
  const { usuarioLogeado } = useAuthContext();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({});
  const [nuevasRespuestas, setNuevasRespuestas] = useState([]);

  const fetchFormulario = async () => {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/api/respuestaformularios/${idFormulario}`
    );
    const formulario = await respuesta.json();
    console.log(`LLEGA ESTO DEL FETCH: `, formulario);
    setFormulario(formulario);

    let respuestas = formulario.respuestas.map((respuesta, index) => {
      for (let i = 0; i < formulario.idFormulario.campos.length; i++) {
        if (
          respuesta.etiqueta === formulario.idFormulario.campos[i].etiqueta &&
          formulario.idFormulario.campos[i].tipo === "select" &&
          respuesta.valor === ""
        ) {
          respuesta.valor = formulario.idFormulario.campos[i].opciones[0];
        }
      }
      return respuesta;
    });
    console.log(`RESPUESTAS: `, respuestas);
    setNuevasRespuestas([...respuestas]);
  };

  function handleChange(e, index) {
    console.log(nuevasRespuestas);
    const { name, value } = e.target;
    const respuestas = [...nuevasRespuestas];
    respuestas[index].valor = value;
    setNuevasRespuestas(respuestas);
  }

  const handleChangeCheckbox = (e, index) => {
    const { name, checked } = e.target;
    const respuestas = [...nuevasRespuestas];
    respuestas[index].valor = checked;
    setNuevasRespuestas(respuestas);
  };

  const valoresAutocompletados = (campo) => {
    if (
      campo.etiqueta === "Nombre y apellido" &&
      usuarioLogeado.usuario.rol === "CONTRIBUYENTE"
    ) {
      let nombre = nuevasRespuestas.filter((respuesta) => {
        return respuesta.etiqueta === "Nombre y apellido";
      });
      nombre[0].valor =
        usuarioLogeado.usuario.nombre + " " + usuarioLogeado.usuario.apellido;
      return (
        usuarioLogeado.usuario.nombre + " " + usuarioLogeado.usuario.apellido
      );
    } else if (
      campo.etiqueta === "DNI" &&
      usuarioLogeado.usuario.rol === "CONTRIBUYENTE"
    ) {
      let nombre = nuevasRespuestas.filter((respuesta) => {
        return respuesta.etiqueta === "DNI";
      });
      nombre[0].valor = usuarioLogeado.usuario.dni;
      return usuarioLogeado.usuario.dni;
    } else {
      return "";
    }
  };

  useEffect(() => {
    fetchFormulario();
  }, []);

  const enviarFormulario = (e) => {
    e.preventDefault();
    fetch(
      `${import.meta.env.VITE_API_URL}/api/respuestaformularios/${
        formulario._id
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          respuestas: nuevasRespuestas,
        }),
      }
    ).then((res) => navigate("/habilitaciones/" + formulario.habilitacion));
  };

  const mostrarFormulario = () => {
    let estructuraFormulario = formulario.idFormulario;
    console.log(`NUEVAS RESPUESTAS: `, nuevasRespuestas);
    return (
      <>
        <h1>{estructuraFormulario.nombreFormulario}</h1>
        {estructuraFormulario.campos.map((campo, index) => {
          if (
            campo.tipo === "text" ||
            campo.tipo === "email" ||
            campo.tipo === "number"
          ) {
            return (
              <div className="form-floating mt-3" key={index}>
                <input
                  type={campo.tipo}
                  className="form-control"
                  id="floatingInput"
                  placeholder={campo.etiqueta}
                  name={campo.etiqueta}
                  required={campo.requerido}
                  value={
                    nuevasRespuestas[index].valor ||
                    valoresAutocompletados(campo)
                  }
                  onChange={(e) => handleChange(e, index)}
                />
                <label htmlFor="floatingInput">{campo.etiqueta}</label>
              </div>
            );
          } else if (campo.tipo === "checkbox") {
            return (
              <div className="form-check mt-3" key={index}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="floatingInput"
                  placeholder={campo.etiqueta}
                  name={campo.etiqueta}
                  required
                  checked={nuevasRespuestas[index].valor}
                  onChange={(e) => handleChangeCheckbox(e, index)}
                />
                <label htmlFor="floatingInput">{campo.etiqueta}</label>
              </div>
            );
          } else if (campo.tipo === "select") {
            return (
              <div className="form-floating mt-3" key={index}>
                <select
                  name={campo.etiqueta}
                  value={nuevasRespuestas[index].valor}
                  onChange={(e) => handleChange(e, index)}
                  className="form-select"
                  aria-label="Default select example"
                  id="floatingSelect"
                >
                  {campo.opciones.map((opcion, index) => (
                    <option key={index} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingSelect">{campo.etiqueta}</label>
              </div>
            );
          }
        })}
      </>
    );
  };

  return (
    <form className="form-signin w-25 m-auto" onSubmit={enviarFormulario}>
      {formulario.idFormulario !== undefined ? mostrarFormulario() : ""}
      <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
        Enviar
      </button>
    </form>
  );
}

export default ResponderFormulario;
