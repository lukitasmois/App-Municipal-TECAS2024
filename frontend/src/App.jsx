import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inicio from "./views/Inicio.jsx";
import EditarUsuario from "./views/usuario/EditarUsuario.jsx";
import { useAuth } from "./useAuth.jsx";
import CrearNegocioScreen from "./views/negocio/CrearNegocioScreen.jsx";
import { ToastContainer } from "react-toastify";
import BusinessModal from "./components/BotonNegocios.jsx";
import ListaNegocios from "./components/ListaNegocios.jsx";
function App() {

  const { usuarioLogeado, setUsuarioLogeado, fetchUsuarioLogeado } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio usuarioLogeado={usuarioLogeado} />} />

        <Route path="/editar-usuario/:id" element={<EditarUsuario />}/>
        <Route path="/crearNegocio" element={<CrearNegocioScreen usuarioLogeado={usuarioLogeado}/>}/>
      </Routes>
      {showModal && (
        <BusinessModal
          businesses={businesses}
          onCreate={handleCreateBusiness}
        />
      )}
      <ToastContainer/>
    </>
  );
}

export default App;
