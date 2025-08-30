import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {user.name}! 🎉
        </h1>
        <p className="text-gray-600 mb-6">Role: <b>{user.role}</b></p>

        {/* If user is normal */}
        {user.role === "user" && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Your Profile</h2>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Skills:</b> {user.skills?.join(", ") || "No skills added yet"}</p>
            
            <button
              className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Edit Resume
            </button>
          </div>
        )}

        {/* If user is admin */}
        {user.role === "admin" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Admin Panel ⚡</h2>
            <p className="text-gray-700 mb-6">
              Here you can manage users and resumes.
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
