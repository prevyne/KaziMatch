import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Spinner from './Spinner.jsx'; // We'll show a spinner while checking auth

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // <-- Get the loading state

  // If we are still checking the user's login status, show a spinner
  if (loading) {
    return <Spinner />;
  }

  // After the check is complete, either show the page or redirect
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;