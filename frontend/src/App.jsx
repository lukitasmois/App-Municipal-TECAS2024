import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inicio from "./views/Inicio.jsx";
import EditarUsuario from "./views/usuario/EditarUsuario.jsx";
import { useAuth } from "./useAuth.jsx";
import CrearNegocioScreen from "./views/negocio/CrearNegocioScreen.jsx";
import { ToastContainer } from "react-toastify";
import GetBussinesesData from "./components/DatosDeNegocio.jsx";
function App() {

  const { usuarioLogeado, setUsuarioLogeado, fetchUsuarioLogeado } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio usuarioLogeado={usuarioLogeado} />} />
        <Route path="/ver_negocios/:id" element={<GetBussinesesData />}/>
        <Route path="/editar-usuario/:id" element={<EditarUsuario />}/>
        <Route path="/crearNegocio" element={<CrearNegocioScreen usuarioLogeado={usuarioLogeado}/>}/>
      </Routes>
      
      <ToastContainer/>
    </>
  );
}

export default App;
