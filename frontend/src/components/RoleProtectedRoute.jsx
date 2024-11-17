import React from 'react';
import { Navigate } from 'react-router-dom';


const RoleProtectedRoute = ({ isAuthenticated, user, allowedRoles, redirectPath = "/", nextView}) => {
  
    if (!isAuthenticated || !allowedRoles.includes(userRole)) {
      return <Navigate to={redirectPath} />;
    }
    return nextView;
  };
  
  export default RoleProtectedRoute;