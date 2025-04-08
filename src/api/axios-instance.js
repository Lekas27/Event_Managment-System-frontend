import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

export const backendClient = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

backendClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
