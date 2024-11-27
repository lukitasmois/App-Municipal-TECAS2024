import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

function EditarUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    cuil: "",
    telefono: "",
    email: "",
    constanciaAFIP: "",
    frenteDNI: "",
    dorsoDNI: "",
  });

  const { actualizarUsuarioLogeado } = useAuthContext();

  const navigate = useNavigate();
  const { id } = useParams();

  function manejoCambios(evento) {
    const campoACambiar = evento.target.name;
    const datoNuevo = evento.target.files
      ? evento.target.files[0]
      : evento.target.value;
    setUsuario({ ...usuario, [campoACambiar]: datoNuevo });
  }

  async function cargarUsuario() {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/api/usuarios/${id}`,
      {
        credentials: "include",
      }
    );
    const usuarioFetch = await respuesta.json();
    setUsuario(usuarioFetch);
    console.log(usuarioFetch);
  }

  useEffect(() => {
    cargarUsuario();
  }, []);

  async function enviarSolicitud(evento) {
    evento.preventDefault();

    const datosValidos = manejarValidaciones({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      dni: usuario.dni,
      cuil: usuario.cuil,
      telefono: usuario.telefono,
      email: usuario.email,
    });

    if (!datosValidos) {
      return;
    }

    const formData = new FormData();

    // Agregar datos del formulario (texto)
    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("dni", usuario.dni);
    formData.append("cuil", usuario.cuil);
    formData.append("telefono", usuario.telefono);
    formData.append("email", usuario.email);

    // Agregar los archivos
    if (usuario.frenteDNI) formData.append("frenteDNI", usuario.frenteDNI);
    if (usuario.dorsoDNI) formData.append("dorsoDNI", usuario.dorsoDNI);
    if (usuario.constanciaAFIP)
      formData.append("constanciaAFIP", usuario.constanciaAFIP);

    // Realizar la solicitud PUT
    fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/editar/${id}`, {
      method: "PUT",
      headers: {},
      credentials: "include",
      body: formData,
    })
      .then((respuesta) => respuesta.json())
      .then((res) => {
        toast.success("Usuario editado correctamente.");
        actualizarUsuarioLogeado(res.usuario);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al enviar los datos:", error);
        toast.error("Error al editar el usuario.");
      });
  }

  function mostrarFormulario() {
    return (
      <center>
        <h1>Formulario para solicitar la habilitación de la cuenta</h1>

        <form
          action="/profile"
          method="POST"
          encType="multipart/form-data"
          onSubmit={enviarSolicitud}
        >
          <label>Nombre:</label>
          <br />
          <input
            type="text"
            placeholder="Ingrese su nombre"
            name="nombre"
            onChange={manejoCambios}
            value={usuario.nombre}
          />
          <br />
          <label>Apellido:</label>
          <br />
          <input
            type="text"
            placeholder="Ingrese su apellido"
            name="apellido"
            onChange={manejoCambios}
            value={usuario.apellido}
          />
          <br />
          <label>DNI:</label>
          <br />
          <input
            type="text"
            placeholder="Ingrese su DNI"
            name="dni"
            onChange={manejoCambios}
            value={usuario.dni}
          />
          <br />
          <label>CUIL:</label>
          <br />
          <input
            type="text"
            placeholder="Ingrese su CUIL"
            name="cuil"
            onChange={manejoCambios}
            value={usuario.cuil}
          />
          <br />
          <label>Telefono:</label>
          <br />
          <input
            type="text"
            placeholder="Ingrese su telefono"
            name="telefono"
            onChange={manejoCambios}
            value={usuario.telefono}
          />
          <br />
          <label>Email:</label>
          <br />
          <input
            type="text"
            placeholder="Ingrese su email"
            name="email"
            onChange={manejoCambios}
            value={usuario.email}
          />
          <br />
          <label>Subir frente de DNI</label>
          <br />
          <input type="file" name="frenteDNI" onChange={manejoCambios} />
          <br />
          <label>Subir dorso de DNI</label>
          <br />
          <input type="file" name="dorsoDNI" onChange={manejoCambios} />
          <br />
          <label>Subir constancia de inscripción de AFIP</label>
          <input type="file" name="constanciaAFIP" onChange={manejoCambios} />
          <br />

          <button type="submit">Enviar</button>
        </form>
      </center>
    );
  }

  return <>{mostrarFormulario()}</>;
}

function manejarValidaciones({ nombre, apellido, dni, cuil, telefono, email }) {
  const regexCUIL = /^([0-9]{2})-?([0-9]{8})-?([0-9])$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!nombre || !apellido || !dni || !cuil || !telefono || !email) {
    toast.error("Todos los campos son obligatorios");
    return false;
  } else if (!regexCUIL.test(cuil)) {
    toast.error(
      "CUIL inválido, debe contener 11 dígitos, y no se aceptan caracteres no numéricos."
    );
    return false;
  } else if (!regexEmail.test(email)) {
    toast.error("Email inválido");
    return false;
  } else {
    return true;
  }
}

export default EditarUsuario;
