import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
            
            <h1>Mi perfil</h1>
            <div className="w-50 m-auto">
            <Contenedor>
            <p>Imagen de perfil: <img className="rounded-circle" style={{ width: "50px", height: "50px", border: "1px solid grey" }} src={usuario.imagen} alt="Imagen de perfil" /> </p>
            <p>Nombre: {usuario.nombre}</p>
            <p>Apellido: {usuario.apellido}</p>
            <p>CUIT: {usuario.cuil}</p>
            <p>Telefono: {usuario.telefono}</p>
            <p>Email: {usuario.email}</p>
            <p>Rol: {usuario.rol}</p>

            <Link to={`/ver_negocios/${id}`} btn className="btn btn-primary">Ver negocios</Link>
            </Contenedor>
            </div>
        </div>
    );
}

export default VerUsuario;