import { useEffect, useState } from "react";
import { getResume } from "../services/resumeService";

export default function Resume() {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getResume()
      .then((res) => setResume(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Error fetching resume")
      );
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">No resume found. Please create one.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-3/4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {resume.headline}
        </h2>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Summary</h3>
          <p className="text-gray-700">{resume.summary}</p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          <p className="text-gray-700">{resume.education}</p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          <p className="text-gray-700">{resume.experience}</p>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <ul className="list-disc ml-6 text-gray-700">
            {resume.skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Links</h3>
          <ul className="space-y-2">
            {resume.githubUrl && (
              <li>
                <a
                  href={resume.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  GitHub
                </a>
              </li>
            )}
            {resume.linkedinUrl && (
              <li>
                <a
                  href={resume.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {resume.portfolioUrl && (
              <li>
                <a
                  href={resume.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Portfolio
                </a>
              </li>
            )}
            {resume.resumeFileUrl && (
              <li>
                <a
                  href={resume.resumeFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Download Resume
                </a>
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
