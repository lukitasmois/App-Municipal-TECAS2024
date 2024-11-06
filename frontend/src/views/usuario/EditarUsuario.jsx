import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarUsuario( { usuarioLogeado } ) {
    
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        cuil: "",
        telefono: "",
        email: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    function manejoCambios(evento) {
        const campoACambiar = evento.target.name;
        const datoNuevo = evento.target.value;
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
        fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/editar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(
                    {
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        cuil: usuario.cuil,
                        telefono: usuario.telefono,
                        email: usuario.email,
                    }
                ),
            }
        ).then((respuesta) => respuesta.json()).then((res) => {
            navigate("/");
        })
    }

    function mostrarFormulario() {
        return (
            <center>
                <h1>Formulario para solicitar la habilitación de la cuenta</h1>

                <form onSubmit={enviarSolicitud}>
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

                <button type="submit">Enviar</button>
                </form>
            </center>
        )
    }

    return <>{mostrarFormulario()}</>
}

export default EditarUsuario