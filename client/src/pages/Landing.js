// src/pages/Landing.js
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-6">Welcome to HireMate 🚀</h1>
      <p className="text-lg mb-10 max-w-xl text-center">
        Your one-stop platform to create, manage, and share professional resumes.  
        Get started now and build your future with ease.
      </p>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-white px-6 py-3 rounded-lg shadow-md hover:bg-white hover:text-blue-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
