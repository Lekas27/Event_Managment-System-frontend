import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://www.goabase.net/api/party/json/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authClient = axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const backendClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
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
