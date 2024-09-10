// src/pages/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('userId'); 

  return isAuthenticated ? <Element /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
