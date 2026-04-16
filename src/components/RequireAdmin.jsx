import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('authToken');
  const role = localStorage.getItem('authRole');

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/productItem" replace />;
  }

  return children;
};

export default RequireAdmin;
