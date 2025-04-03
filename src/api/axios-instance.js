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
