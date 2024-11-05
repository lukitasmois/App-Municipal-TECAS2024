import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inicio from "./views/Inicio.jsx";
import { useAuth } from "./useAuth.jsx";
import CrearNegocioScreen from "./views/negocio/CrearNegocioScreen.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  const { usuarioLogeado } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio usuarioLogeado={usuarioLogeado} />} />
        <Route path="/crearNegocio" element={<CrearNegocioScreen usuarioLogeado={usuarioLogeado}/>}/>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
