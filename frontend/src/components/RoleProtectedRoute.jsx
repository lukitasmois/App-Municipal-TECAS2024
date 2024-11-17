import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../useAuth';


function RoleProtectedRoute({allowedRoles, redirectPath = "/", nextView}){
  const { usuarioLogeado, cargando} = useAuth();

  if (cargando) {
    return ""
  }

  console.log("Ruta protegida: " ,usuarioLogeado);
  
  
    if (!usuarioLogeado.logeado || !allowedRoles.includes(usuarioLogeado.usuario.rol)) {
      return <Navigate to={redirectPath} />;
    }
    return nextView;
  };
  
  export default RoleProtectedRoute;