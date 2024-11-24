import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Contenedor from "../../components/Contenedor";

function VerUsuario() {

    const { id } = useParams();

    const [usuario, setUsuario] = useState({});
    
    function cargarUsuario(){
        fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}`, {
            credentials: "include",
        }).then(response => response.json())
        .then(data => {
            setUsuario(data);
        });
    }

    useEffect(() => {
        cargarUsuario();
    }, []);

    return (
        <div>
            <Contenedor>
            <h1>Mi perfil</h1>
            <img src={usuario.imagen} alt="Imagen de perfil" />
            <p>Nombre: {usuario.nombre}</p>
            <p>Apellido: {usuario.apellido}</p>
            <p>CUIT: {usuario.cuil}</p>
            <p>Telefono: {usuario.telefono}</p>
            <p>Email: {usuario.email}</p>
            </Contenedor>
        </div>
    );
}

export default VerUsuario;