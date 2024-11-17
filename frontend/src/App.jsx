import "./App.css";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from "./views/Inicio.jsx";
import EditarUsuario from "./views/usuario/EditarUsuario.jsx";
import { useAuth } from "./useAuth.jsx";
import CrearNegocioScreen from "./views/negocio/CrearNegocioScreen.jsx";
import VerNegocio from "./views/negocio/VerNegocio.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoute  from "./components/InicioProtegido.jsx";
import BarraNavegacion from "./components/BarraNavegacion.jsx";
import CerrarSesion from "./views/usuario/CerrarSesion.jsx";

import { Toaster } from "react-hot-toast";
function App() {
  const { usuarioLogeado, setUsuarioLogeado, fetchUsuarioLogeado } = useAuth();

  return (
    <>
      <BarraNavegacion usuarioLogeado={usuarioLogeado}></BarraNavegacion>
      <Routes>
        <Route path="/" element={<Inicio usuarioLogeado={usuarioLogeado} />} />
        <Route path="/cerrar-sesion" element={<CerrarSesion setUsuarioLogeado={setUsuarioLogeado} />}></Route>
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        <Route
          path="/crearNegocio"
          element={<CrearNegocioScreen usuarioLogeado={usuarioLogeado} />}
        />
        <Route path="/vernegocio/:idNegocio" element={<VerNegocio />} />
      </Routes>
      <ToastContainer />
      <Toaster />
    </>
  );
}

export default App;
