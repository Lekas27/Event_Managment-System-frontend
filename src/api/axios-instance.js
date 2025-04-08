import axios from "axios";

export const backendClient = axios.create({
  baseURL: "http://64.226.65.16:8080/",
  header: {
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
