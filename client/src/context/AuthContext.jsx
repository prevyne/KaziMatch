import React, { createContext, useState, useContext, useEffect } from 'react';
import { getLoggedInUser, logoutUser as apiLogout } from '../api/authApi.js';
import Spinner from '../components/common/Spinner.jsx';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const currentUser = await getLoggedInUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserStatus();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };
  
  const value = { user, login, logout, isAuthenticated: !!user };

  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};