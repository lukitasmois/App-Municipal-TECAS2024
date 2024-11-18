import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [usuarioLogeado, setUsuarioLogeado] = useState({
    usuario: { _id: "", nombre: "", rol: "CONTRIBUYENTE" },
    logeado: false,
  });
  const [cargando, setCargando] = useState(true);

  async function fetchUsuarioLogeado() {
    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_URL}/api/usuarios/usuario-logeado`,
        {
          credentials: "include",
        }
      );
      const usuario = await respuesta.json();
      setUsuarioLogeado(usuario);
    } catch (error) {
      console.error("Error al verificar la sesion del usuario: ", error);
      toast.error("Error al verificar la sesion del usuario");
    } finally {
      setCargando(false);
    }
  }

  function actualizarUsuarioLogeado(nuevoUsuario) {
    setUsuarioLogeado((prevState) => ({
      ...prevState,
      usuario: nuevoUsuario,
    }));
  }

  useEffect(() => {
    fetchUsuarioLogeado();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuarioLogeado,
        setUsuarioLogeado,
        cargando,
        fetchUsuarioLogeado,
        actualizarUsuarioLogeado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuthContext };
