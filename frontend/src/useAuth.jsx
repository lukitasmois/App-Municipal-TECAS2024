import { useState, useEffect } from "react";

const useAuth = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState({
    usuario: { id: "", nombre: "", esAdmin: false },
    logeado: false,
  });
  const [cargando, setCargando] = useState(true);

  async function fetchUsuarioLogeado() {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/api/usuarios/usuario-logeado`,
      {
        credentials: "include",
      }
    );
    const usuario = await respuesta.json();
    setUsuarioLogeado(usuario);
    setCargando(false);
  }

  useEffect(() => {
    fetchUsuarioLogeado();
  }, []);

  return {
    usuarioLogeado,
    setUsuarioLogeado,
    cargando,
  };
};

export { useAuth };
