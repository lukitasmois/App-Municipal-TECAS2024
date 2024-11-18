import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import "./BarraNavegacion.css";
import logoMunicipalidad from "../assets/logo-municipio.png";

function BarraNavegacion() {
  const { usuarioLogeado } = useAuthContext();

  function navegacionLogeado() {
    if (usuarioLogeado.logeado) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Hola {usuarioLogeado.usuario.nombre}!
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cerrar-sesion">
              Cerrar sesion
            </NavLink>
          </li>
        </>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <img
          src={logoMunicipalidad}
          style={{ maxWidth: "180px", maxHeight: "48px" }}
          alt="Logo Municipalidad"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Preguntas-frecuentes">
                Preguntas frecuentes
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
            {navegacionLogeado()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default BarraNavegacion;
