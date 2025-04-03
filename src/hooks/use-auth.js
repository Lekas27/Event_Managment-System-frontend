import { useState } from "react";
import { AuthService } from "../services/auth-service";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      await AuthService.login(username, password);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    navigate("/");
  };

  const getUser = async () => {
    try {
      return await AuthService.getUser();
    } catch (error) {
      console.error("Error getting user", error);
      return null;
    }
  };

  return {
    isAuthenticated,
    login,
    logout,
    getUser,
  };
};
