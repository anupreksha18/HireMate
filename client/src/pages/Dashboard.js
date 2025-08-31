import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Welcome */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {user.name || "User"}! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Role: <b>{user.role || "user"}</b>
        </p>

        {/* User Panel */}
        {user.role === "user" && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Your Profile</h2>
            <p>
              <b>Email:</b> {user.email || "Not provided"}
            </p>
            <p>
              <b>Skills:</b>{" "}
              {Array.isArray(user.skills) && user.skills.length > 0
                ? user.skills.join(", ")
                : "No skills added yet"}
            </p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => navigate("/resume-form")}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Edit Resume
              </button>
              <button
                onClick={() => navigate("/resume")}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-600"
              >
                My Resume
              </button>
            </div>
          </div>
        )}

        {/* Admin Panel */}
        {user.role === "admin" && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Admin Panel ⚡</h2>
            <p className="text-gray-700 mb-6">
              Manage users and resumes from here.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-indigo-100 p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold">Total Users</h3>
                <p className="text-2xl text-indigo-700">123</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold">Total Resumes</h3>
                <p className="text-2xl text-green-700">85</p>
              </div>
            </div>

            <button
              className="mt-6 bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700"
              onClick={() => navigate("/admin/users")}
            >
              Manage Users
            </button>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-8 bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
