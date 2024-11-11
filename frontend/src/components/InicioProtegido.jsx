
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, redirectPath = "/login", nextView }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return nextView;
};

export default ProtectedRoute;
