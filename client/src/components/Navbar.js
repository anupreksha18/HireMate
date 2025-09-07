import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 flex justify-between items-center shadow-lg">
      <p
        
        className="text-2xl font-bold text-white hover:text-yellow-300 transition-colors duration-200"
      >
        HireMate
      </p>

      <div className="flex items-center space-x-3">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-100 hover:shadow-md transition-all duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-100 hover:shadow-md transition-all duration-200"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 hover:text-yellow-300 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/resume"
              className="px-4 py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 hover:text-yellow-300 transition-all duration-200"
            >
              My Resume
            </Link>
            <Link
              to="/resume-form"
              className="px-4 py-2 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 hover:text-yellow-300 transition-all duration-200"
            >
              Edit Resume
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
