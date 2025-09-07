import { createContext, useState, useContext, useEffect } from "react";
import * as authService from "../services/authService";
import { getResume } from "../services/resumeService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null); // <-- store resume data here
  const [loading, setLoading] = useState(true);

  // On mount: check localStorage first, fallback to API
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      fetchResume(parsed);
    } else {
      authService
        .getProfile()
        .then((res) => {
          if (res.data) {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            fetchResume(res.data);
          } else {
            setLoading(false);
          }
        })
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  }, []);

  const fetchResume = (currentUser) => {
    getResume(currentUser?.id)
      .then((res) => setData(res.data))
      .catch(() => setData({ skills: [], education: [], projects: [] }))
      .finally(() => setLoading(false));
  };

  // Login function
  const login = async (data) => {
    const res = await authService.login(data);
    if (res.data) {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.accessToken);
      fetchResume(res.data); // fetch resume on login
    }
    return res.message;
  };

  // Register function
  const register = async (data) => {
    const res = await authService.register(data);
    if (res.data) {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.accessToken);
      fetchResume(res.data); // fetch resume on register
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
      setData(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, data, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
