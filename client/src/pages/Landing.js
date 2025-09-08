// src/pages/Landing.js
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 md:px-8">
      {/* Hero Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center leading-tight">
        Welcome to HireMate 🚀
      </h1>

      {/* Subtext */}
      <p className="text-base sm:text-lg md:text-xl mb-10 max-w-md sm:max-w-xl text-center">
        Your one-stop platform to create, manage, and share professional
        resumes. Build your future with ease.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <Link
          to="/register"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 text-center"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-white px-6 py-3 rounded-lg shadow-md hover:bg-white hover:text-blue-600 text-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
