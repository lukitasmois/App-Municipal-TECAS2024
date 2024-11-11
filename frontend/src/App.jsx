import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inicio from "./views/Inicio.jsx";
import { useAuth } from "./useAuth.jsx";
import  ProtectedRoute  from "./components/InicioProtegido.jsx";
function App() {
  const { usuarioLogeado } = useAuth();
  console.log("hola")
  return (
    <>
      <Routes>
      <Route
        path="/hola"
        element={
          <ProtectedRoute isAuthenticated={usuarioLogeado}>
            <Inicio usuarioLogeado={usuarioLogeado} />
          </ProtectedRoute>
        }
      />
      
        <Route path="/" element={<Inicio usuarioLogeado={usuarioLogeado} />} />
      </Routes>
    </>
  );
}

export default App;
