import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function CerrarSesion({setUsuarioLogeado}) {

    const navigate = useNavigate();

    async function desconectar(){
            const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/cerrar-sesion`,
            {
                credentials: "include",
            }
            );
            const usuario = await respuesta.json();
            setUsuarioLogeado(usuario);
            navigate('/');
    }

    useEffect(() => { 
        desconectar();
    }, []);

    return (
        <div>
            <h1>Desconectado</h1>
        </div>
    )
}

export default CerrarSesion