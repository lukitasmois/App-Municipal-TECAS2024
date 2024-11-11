import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inicio from "./views/Inicio.jsx";
import EditarUsuario from "./views/usuario/EditarUsuario.jsx";
import { useAuth } from "./useAuth.jsx";

function App() {
  const { usuarioLogeado } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio usuarioLogeado={usuarioLogeado} />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario usuarioLogeado={usuarioLogeado} />}/>
      </Routes>
    </>
  );
}

export default App;
