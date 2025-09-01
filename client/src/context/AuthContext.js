import { createContext, useState, useContext, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: check localStorage first, fallback to API
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      authService
        .getProfile()
        .then((res) => {
          if (res.data) {
            setUser(res.data); 
            localStorage.setItem("user", JSON.stringify(res.data));
          }
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  }, []);

  // Login function
  const login = async (data) => {
    const res = await authService.login(data);
    if (res.data) {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.accessToken);
    }
    return res.message; // string only
  };

  // Register function
  const register = async (data) => {
    const res = await authService.register(data);
    if (res.data) {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.accessToken);
    }
    return res.message;
  };

const logout = async () => {
  try {
    await authService.logout();
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
};

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
