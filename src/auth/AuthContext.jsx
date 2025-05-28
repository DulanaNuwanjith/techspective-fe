import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginUtil, logout as logoutUtil, isAuthenticated as getAuth } from './auth';

export const AUTH_CHANGE_EVENT = 'authStateChanged';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(getAuth());
  const [forceUpdateValue, setForceUpdateValue] = useState(0);

  const forceUpdate = () => {
    setForceUpdateValue(prev => prev + 1);
    const event = new CustomEvent(AUTH_CHANGE_EVENT, { detail: { isAuthenticated: getAuth() } });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    setAuthState(getAuth());
  }, [forceUpdateValue]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'isAuthenticated') {
        setAuthState(getAuth());
        forceUpdate();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (username, password) => {
    const success = loginUtil(username, password);
    if (success) {
      setAuthState(true);
      forceUpdate();
    }
    return success;
  };

  const logout = () => {
    logoutUtil();
    setAuthState(false);
    forceUpdate();
  };

  const contextValue = {
    isAuthenticated: authState,
    login,
    logout,
    _forceUpdateValue: forceUpdateValue,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);