import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inicio from "./views/Inicio.jsx";
import EditarUsuario from "./views/usuario/EditarUsuario.jsx";
import { useAuth } from "./useAuth.jsx";
import CrearNegocioScreen from "./views/negocio/CrearNegocioScreen.jsx";
import VistaHabilitaciones from "./views/habilitacion/Habilitaciones.jsx";
import { ToastContainer } from "react-toastify";

import  ProtectedRoute  from "./components/InicioProtegido.jsx";
function App() {

  const { usuarioLogeado, setUsuarioLogeado, fetchUsuarioLogeado } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio usuarioLogeado={usuarioLogeado} />} />

        <Route path="/editar-usuario/:id" element={<EditarUsuario />}/>
        <Route path="/habilitaciones" element={<VistaHabilitaciones />}/>
        <Route path="/crearNegocio" element={<CrearNegocioScreen usuarioLogeado={usuarioLogeado}/>}/>



      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
