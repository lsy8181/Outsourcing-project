import { createContext, useContext, useEffect, useState } from 'react';
import { json } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [user_id, setUser_id] = useState('');

  useEffect(() => {
    const storeUser = localStorage.getItem('user');
    if (storeUser) {
      setUser(JSON.parse(storeUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    const storage = await localStorage.getItem('sb-xxeqrlcareyhdjuuyipu-auth-token');
    const parsedStorage = JSON.parse(storage);
    setUser_id(parsedStorage.user.id);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout, user, user_id }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
