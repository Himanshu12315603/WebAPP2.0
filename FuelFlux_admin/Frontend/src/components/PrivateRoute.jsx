import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  // Use a robust check for authentication (token in sessionStorage)
  // Check authentication in both localStorage (Remember Me) and sessionStorage
  const isAuthenticated = !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
}
