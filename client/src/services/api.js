import axios from "axios";

const api = axios.create({
  baseURL: "/api/resumes",
  withCredentials: true,
});

// Add token to every request if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
