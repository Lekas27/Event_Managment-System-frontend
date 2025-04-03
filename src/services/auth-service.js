import { authClient } from "../api/axios-instance";

export const AuthService = {
  login: async (username, password) => {
    try {
      const response = await authClient.post("/auth/login", {
        username: username,
        password: password,
      });

      console.log(response.data);

      localStorage.setItem("accessToken", response.data.accessToken);

      return response.data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
  },

  getUser: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await authClient.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Failed to fetch user data", error);
      throw error;
    }
  },

  isAuthenticated: () => {
    return localStorage.getItem("accessToken");
  },
};
