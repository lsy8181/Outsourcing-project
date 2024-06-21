import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [user_id, setUser_id] = useState('');

  useEffect(() => {
    const storeUser = localStorage.getItem('user');
    if (storeUser.length) {
      const data = JSON.parse(storeUser);
      setUser(data);
      setUser_id(data.user_id);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    const storage = localStorage.getItem('sb-xxeqrlcareyhdjuuyipu-auth-token');
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
