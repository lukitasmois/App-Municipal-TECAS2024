import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function BarraNavegacion() 
{

    const { usuarioLogeado } = useAuthContext();

    function navegacionDeslogeado()
    {
        if (!usuarioLogeado.logeado){
            return (
            <>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">Inicio</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/Preguntas-frecuentes">Preguntas frecuentes</NavLink>
                </li>
            </>
            )
        }
    }

    function navegacionLogeado()
    {
        if(usuarioLogeado.logeado){
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Inicio</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Preguntas-frecuentes">Preguntas frecuentes</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/cerrar-sesion">Cerrar sesion</NavLink>
                    </li>
                </>
            )
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {navegacionDeslogeado()}
                    </ul>
                    <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                        {navegacionLogeado()}
                    </ul>
                </div>
            </div>
        </nav>
)
}

export default BarraNavegacion;