import { backendClient } from "../api/axios-instance";
import qs from "qs"; // koristi se za formatiranje u form-urlencoded

export const AuthService = {
  login: async (username, password) => {
    try {
      const data = qs.stringify({
        username: username,
        password: password,
      });

      const response = await backendClient.post("/auth/login", data);
      const { access_token } = response.data;

      localStorage.setItem("accessToken", access_token);
      return response.data;
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
  },

  register: async (username, email, password) => {
    try {
      const response = await backendClient.post("/users/", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getUser: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No token");

    const response = await backendClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  },
};
