import { createContext, useContext } from "react";
import { useAuth } from "../hooks/use-auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, login, logout, getUser } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
