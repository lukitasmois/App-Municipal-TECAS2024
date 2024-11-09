import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarUsuario( { usuarioLogeado } ) {
    
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        cuil: "",
        telefono: "",
        email: "",
        constanciaAFIP: "",
        frenteDNI: "",
        dorsoDNI: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    function manejoCambios(evento) {
        const campoACambiar = evento.target.name;
        const datoNuevo = evento.target.files ? evento.target.files[0] : evento.target.value;
        setUsuario({ ...usuario, [campoACambiar]: datoNuevo });
    }
    

    async function cargarUsuario() {
        const respuesta = await fetch(
            `${import.meta.env.VITE_API_URL}/api/usuarios/${id}`, 
            {
                credentials: "include",
            }
        )
        const usuarioFetch = await respuesta.json();
        setUsuario(usuarioFetch);
        console.log(usuarioFetch);
    }

    useEffect(() => {
        cargarUsuario();
    }, []);

    async function enviarSolicitud(evento) {
        evento.preventDefault();
        console.log(usuario);
        
        const formData = new FormData();
    
        // Agregar datos del formulario (texto)
        formData.append("nombre", usuario.nombre);
        formData.append("apellido", usuario.apellido);
        formData.append("cuil", usuario.cuil);
        formData.append("telefono", usuario.telefono);
        formData.append("email", usuario.email);
    
        // Agregar los archivos
        if (usuario.frenteDNI) formData.append("frenteDNI", usuario.frenteDNI);
        if (usuario.dorsoDNI) formData.append("dorsoDNI", usuario.dorsoDNI);
        if (usuario.constanciaAFIP) formData.append("constanciaAFIP", usuario.constanciaAFIP);
    
        // Realizar la solicitud PUT
        fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/editar/${id}`, {
            method: "PUT",
            headers: {
                // No pongas Content-Type aquí, ya que el navegador lo establecerá automáticamente cuando se use FormData
            },
            credentials: "include",
            body: formData,
        })
        .then((respuesta) => respuesta.json())
        .then((res) => {
            navigate("/");
        })
        .catch((error) => {
            console.error("Error al enviar los datos:", error);
        });
    }
    

    function mostrarFormulario() {
        return (
            <center>
                <h1>Formulario para solicitar la habilitación de la cuenta</h1>

                <form action="/profile" method="POST" encType="multipart/form-data" onSubmit={enviarSolicitud}>
                    <label>Nombre:</label>
                    <br/>
                    <input 
                        type="text" 
                        placeholder="Ingrese su nombre" 
                        name="nombre" 
                        onChange={manejoCambios} 
                        value={usuario.nombre}
                    />
                    <br/>
                    <label>Apellido:</label>
                    <br/>
                    <input 
                        type="text" 
                        placeholder="Ingrese su apellido" 
                        name="apellido" 
                        onChange={manejoCambios} 
                        value={usuario.apellido} 
                    />
                    <br/>
                    <label>CUIL:</label>
                    <br/>
                    <input 
                        type="text" 
                        placeholder="Ingrese su CUIL" 
                        name="cuil" 
                        onChange={manejoCambios} 
                        value={usuario.cuil}
                    />
                    <br/>
                    <label>Telefono:</label>
                    <br/>
                    <input 
                        type="text" 
                        placeholder="Ingrese su telefono" 
                        name="telefono" 
                        onChange={manejoCambios} 
                        value={usuario.telefono}
                    />
                    <br/>
                    <label>Email:</label>
                    <br/>
                    <input 
                        type="text" 
                        placeholder="Ingrese su email" 
                        name="email" 
                        onChange={manejoCambios} 
                        value={usuario.email}
                    />
                    <br/>
                    <label>Subir frente de DNI</label>
                    <br/>
                    <input type="file" name="frenteDNI" onChange={manejoCambios}/>
                    <br/>
                    <label>Subir dorso de DNI</label>
                    <br/>
                    <input type="file" name="dorsoDNI" onChange={manejoCambios}/>
                    <br/>
                    <label>Subir constancia de inscripción de AFIP</label>
                    <input type="file" name="constanciaAFIP" onChange={manejoCambios}/>
                    <br/>


                <button type="submit">Enviar</button>
                </form>
            </center>
        )
    }

    return <>{mostrarFormulario()}</>
}

export default EditarUsuario