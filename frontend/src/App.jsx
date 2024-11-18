import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inicio from "./views/Inicio.jsx";
import EditarUsuario from "./views/usuario/EditarUsuario.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
import CrearNegocioScreen from "./views/negocio/CrearNegocioScreen.jsx";
import VerNegocio from "./views/negocio/VerNegocio.jsx";
import { ToastContainer } from "react-toastify";
import GetBussinesesData from "./components/DatosDeNegocio.jsx";
import ProtectedRoute from "./components/InicioProtegido.jsx";
import BarraNavegacion from "./components/BarraNavegacion.jsx";
import VistaHabilitaciones from "./views/habilitacion/Habilitaciones.jsx";
import CerrarSesion from "./views/usuario/CerrarSesion.jsx";
import { Toaster } from "react-hot-toast";
import { VerPlanos } from "./views/administracion/verPlanos.jsx";
import RoleProtectedRoute from "./components/RoleProtectedRoute.jsx";

function App() {
  return (
    <>
      <BarraNavegacion></BarraNavegacion>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/administracion/ver-planos"
          element={
            <RoleProtectedRoute
              allowedRoles={["EMPLEADO"]}
              nextView={<VerPlanos />}
            />
          }
        />
        <Route path="/ver_negocios/:id" element={<GetBussinesesData />} />
        <Route path="/cerrar-sesion" element={<CerrarSesion />}></Route>
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        <Route path="/crearNegocio" element={<CrearNegocioScreen />} />
        <Route path="/habilitaciones" element={<VistaHabilitaciones />} />
        <Route path="/vernegocio/:idNegocio" element={<VerNegocio />} />
      </Routes>
      <ToastContainer />
      <Toaster />
    </>
  );
}

export default App;
