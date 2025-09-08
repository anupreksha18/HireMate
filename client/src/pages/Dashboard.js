// src/pages/Dashboard.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaFileAlt, FaGraduationCap, FaProjectDiagram, FaLightbulb, FaBell } from "react-icons/fa";

export default function Dashboard() {
  const { user, logout, data } = useAuth(); // assuming you store resume data in context
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }
console.log("Dashboard data:", data);
  // Example dynamic data (replace with your real context/state)
  const skills = data?.skills || [];        // array of skills
  const education = data?.education || [];  // array of education entries
  const projects = data?.projects || [];    // array of projects

  const quickActions = [
    { title: "Add Education", icon: <FaGraduationCap />, action: () => navigate("/resume-form#education") },
    { title: "Add Project", icon: <FaProjectDiagram />, action: () => navigate("/resume-form#projects") },
  ];

  const stats = [
    { title: "Skills Added", value: skills.length, icon: <FaUsers className="text-indigo-600 text-3xl mb-2" />, color: "indigo" },
    { title: "Education Entries", value: education.length, icon: <FaGraduationCap className="text-green-700 text-3xl mb-2" />, color: "green" },
    { title: "Projects", value: projects.length, icon: <FaProjectDiagram className="text-yellow-600 text-3xl mb-2" />, color: "yellow" },
  ];

  return (
   <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
  <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 space-y-8">
    
    {/* Welcome Header */}
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
        Welcome, {user.name || "User"}! 🎉
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
        Email: {user.email || "Not provided"}
      </p>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {quickActions.map((item, idx) => (
        <button
          key={idx}
          onClick={item.action}
          className="flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          {item.icon} {item.title}
        </button>
      ))}
    </div>

    {/* Analytics Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((s, idx) => (
        <div
          key={idx}
          className={`p-6 rounded-xl shadow-md flex flex-col items-center hover:scale-105 transition transform 
            ${s.color === "indigo" ? "bg-indigo-100 text-indigo-700" : ""} 
            ${s.color === "green" ? "bg-green-100 text-green-700" : ""} 
            ${s.color === "yellow" ? "bg-yellow-100 text-yellow-700" : ""}`}
        >
          {s.icon}
          <p className="text-gray-700 text-lg">{s.title}</p>
          <p className="text-2xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>

    {/* Resume Buttons */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        onClick={() => navigate("/resume-form")}
        className="bg-blue-600 text-white py-3 rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
      >
        Edit Resume
      </button>
      <button
        onClick={() => navigate("/resume")}
        className="bg-gray-500 text-white py-3 rounded-xl shadow-lg hover:bg-gray-600 transition transform hover:scale-105"
      >
        View Resume
      </button>
    </div>

    {/* Logout */}
    <div className="flex justify-center">
      <button
        onClick={logout}
        className="bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-700 transition transform hover:scale-105"
      >
        Logout
      </button>
    </div>

  </div>
</div>

  );
}
