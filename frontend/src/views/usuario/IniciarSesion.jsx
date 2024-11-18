import "./IniciarSesion.css";
import GoogleLogo from "../../assets/google-logo.jpg";

function IniciarSesion() {
  return (
    <div style={{ textAlign: "center" }}>
      <a
        className="btn btn-outline-dark"
        href={`${import.meta.env.VITE_API_URL}/api/usuarios/google`}
        role="button"
        style={{ textTransform: "none" }}
      >
        <img
          style={{ marginBottom: "3px", marginRight: "5px", width: "20px" }}
          alt="Iniciar Sesion con Google"
          src={GoogleLogo}
        />
        Iniciar Sesion con Google
      </a>
    </div>
  );
}

export default IniciarSesion;
