/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  getToken,
  getUser,
  normalizeUser,
  removeToken,
  setRole,
  setToken as persistToken,
  setUser as persistUser,
} from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [token, setTokenState] = useState(getToken());
  const [loading] = useState(false);

  const login = (userData, authToken) => {
    const normalizedUser = normalizeUser(userData);
    setUser(normalizedUser);
    persistUser(normalizedUser);

    if (normalizedUser?.role) {
      setRole(normalizedUser.role);
    }

    if (authToken) {
      setTokenState(authToken);
      persistToken(authToken);
    }
  };

  const updateUser = (userData) => {
    const normalizedUser = normalizeUser(userData);
    setUser(normalizedUser);
    persistUser(normalizedUser);
  };

  const logout = () => {
    setUser(null);
    setTokenState(null);
    removeToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        student: user,
        token,
        isLoggedIn: Boolean(token),
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
