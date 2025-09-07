// src/pages/Resume.jsx
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { getResume } from "../services/resumeService";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import html2pdf from "html2pdf.js";

export default function Resume() {
  const { user } = useAuth();
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const containerRef = useRef();

  useEffect(() => {
    getResume()
      .then((res) => {
        if (res?.data) setResume(res.data);
        else setError("No resume found. Please create one.");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error fetching resume");
      });
  }, []);

  const handleDownload = () => {
    if (!containerRef.current) return;
    html2pdf()
      .set({
        filename: `${user?.name || "resume"}.pdf`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { format: "a4", orientation: "portrait", unit: "mm" },
        pagebreak: { mode: ["css"] },
      })
      .from(containerRef.current)
      .save();
  };

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-100">
        {error}
      </div>
    );

  if (!resume)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 bg-gray-100">
        Loading resume...
      </div>
    );

  const {
    headline,
    summary,
    education,
    experience,
    projects,
    certifications,
    achievements,
    skills,
    linkedinUrl,
    githubUrl,
  } = resume;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 font-sans">
      <style>{`
        /* Individual items should not split */
        li {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        /* Sections can split naturally */
        section {
          page-break-inside: auto;
        }
        /* Hide button in PDF */
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="bg-white shadow-lg p-12 relative"
        style={{ width: "210mm", minHeight: "297mm" }}
      >
        {/* Top-right links */}
        <div className="absolute top-6 right-6 flex gap-4 text-sm">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-800 hover:text-gray-900"
            >
              <FaGithub /> {githubUrl}
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-700 hover:text-blue-800"
            >
              <FaLinkedin /> {linkedinUrl}
            </a>
          )}
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{user.name || "Your Name"}</h1>
          <p className="text-gray-600 mt-1">{user.email || "email@example.com"}</p>
          {headline && <p className="text-gray-500 italic mt-1">{headline}</p>}
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Summary */}
          {summary && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-1 mb-2">
                Summary
              </h2>
              <p className="text-gray-700">{summary}</p>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-1 mb-2">
                Education
              </h2>
              <ul className="space-y-1 text-gray-700">
                {education.map((edu) => (
                  <li key={edu._id} className="flex justify-between">
                    <span>
                      <strong>{edu.degree}</strong>, {edu.school}
                    </span>
                    <span>{edu.year}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-1 mb-2">
                Experience
              </h2>
              <ul className="space-y-1 text-gray-700">
                {experience.map((exp) => (
                  <li key={exp._id} className="flex justify-between">
                    <span>
                      <strong>{exp.role}</strong> at <em>{exp.company}</em>
                    </span>
                    <span>{exp.duration}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-1 mb-2">
                Projects
              </h2>
              <ul className="space-y-1 text-gray-700">
                {projects.map((proj) => (
                  <li key={proj._id}>
                    <strong>{proj.title}</strong>: {proj.description}{" "}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        [Link]
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-gray-300 rounded text-gray-700 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-1 mb-2">
                Certifications
              </h2>
              <ul className="space-y-1 text-gray-700">
                {certifications.map((c) => (
                  <li key={c._id}>
                    {c.name} by {c.issuer} ({c.year})
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Achievements */}
          {achievements?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-1 mb-2">
                Achievements
              </h2>
              <ul className="space-y-1 text-gray-700">
                {achievements.map((a) => (
                  <li key={a._id}>{a.title} : {a.description}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="no-print mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Download PDF
      </button>
    </div>
  );
}
