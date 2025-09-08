// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import ResumeForm from "./pages/ResumeForm";
import Landing from "./pages/Landing";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    
      <Router>
        <Navbar />
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Pages */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <Resume />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-form"
            element={
              <ProtectedRoute>
                <ResumeForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
   
  );
}

export default App;
