// src/pages/Resume.jsx
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getResume } from "../services/resumeService";

export default function Resume() {
  const { user}  = useAuth();
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getResume()
      .then((res) => {
        console.log("Resume from API:", res);
        if (res?.data) {
          setResume(res.data);
        } else {
          setError("No resume found. Please create one.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Error fetching resume");
      });
  }, []);

  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!resume) return <div className="flex justify-center items-center min-h-screen text-gray-600">Loading resume...</div>;

  const { headline, summary, education, experience, skills, resumeFileUrl, githubUrl, linkedinUrl, portfolioUrl } = resume;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-3/4">
        {/* Name and Email */}
        {user && (
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{user.name || "Your Name"}</h1>
            <p className="text-gray-600">{user.email || "email@example.com"}</p>
          </div>
        )}

        {/* Headline */}
        {headline && <h2 className="text-2xl font-semibold mb-4 text-center">{headline}</h2>}

        {/* Summary */}
        {summary && (
          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Summary</h3>
            <p className="text-gray-700">{summary}</p>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            {education.map((edu, idx) => (
              <p key={idx}>
                {edu.school} - {edu.degree} ({edu.year})
              </p>
            ))}
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            {experience.map((exp, idx) => (
              <p key={idx}>
                {exp.role} at {exp.company} ({exp.years})
              </p>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <ul className="list-disc ml-6 text-gray-700">
              {skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Links */}
        {(resumeFileUrl || githubUrl || linkedinUrl || portfolioUrl) && (
          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Links</h3>
            <ul className="space-y-2">
              {resumeFileUrl && (
                <li>
                  <a href={resumeFileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Download Resume
                  </a>
                </li>
              )}
              {githubUrl && (
                <li>
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    GitHub
                  </a>
                </li>
              )}
              {linkedinUrl && (
                <li>
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    LinkedIn
                  </a>
                </li>
              )}
              {portfolioUrl && (
                <li>
                  <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Portfolio
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
