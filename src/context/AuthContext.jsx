import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [user_id, setUser_id] = useState('');

  const login = async (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    const storage = await localStorage.getItem('sb-xxeqrlcareyhdjuuyipu-auth-token');
    const parsedStorage = JSON.parse(storage);
    setUser_id(parsedStorage.user.id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout, user, user_id }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
