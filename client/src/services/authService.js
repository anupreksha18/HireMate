import axios from 'axios';

const API_URL =  "/api/users"// backend base URL

// Register user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData,{withCredentials: true });
  return response.data;
}

// Login user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData,{withCredentials: true });
  return response.data;
}

// Logout user
export const logout = async () => { 
  const response = await axios.post(`${API_URL}/logout`, {},{withCredentials: true });
  return response.data;
}

// Get user profile
export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`,{withCredentials: true });
  return response.data;
}