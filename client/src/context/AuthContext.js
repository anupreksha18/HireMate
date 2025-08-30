import { createContext, useState, useContext, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile on initial render
  useEffect(() => {
    authService
      .getProfile()
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  
// Login function
const login = async (data) => {
  const res = await authService.login(data);
  setUser(res.data);
  return res.message; // ✅ only return string
};

// Register function
const register = async (data) => {
  const res = await authService.register(data);
  setUser(res.data);
  return res.message; // ✅ only return string
};


  // Logout function
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
