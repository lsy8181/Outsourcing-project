import { createContext, useContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storeUser = localStorage.getItem('user');
    if (storeUser) {
      setUser(JSON.parse(storeUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
