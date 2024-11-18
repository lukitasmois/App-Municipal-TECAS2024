import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

function CerrarSesion() {
    
    const navigate = useNavigate();

    const {setUsuarioLogeado} = useAuthContext();

    async function desconectar(){
            const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/cerrar-sesion`,
            {
                credentials: "include",
            }
            );
            const usuario = await respuesta.json();
            setUsuarioLogeado(usuario);
            toast.success('Sesión cerrada');
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