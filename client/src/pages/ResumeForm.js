import { useState, useEffect } from "react";
import { saveResume, getResume } from "../services/resumeService";

export default function ResumeForm() {
  const [form, setForm] = useState({
    headline: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
    resumeFileUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const [message, setMessage] = useState("");

  // Load resume if already exists (update case)
  useEffect(() => {
    getResume()
      .then((res) => {
        if (res?.data) {
          setForm({
            headline: res.data.headline || "",
            summary: res.data.summary || "",
            education: res.data.education || "",
            experience: res.data.experience || "",
            skills: res.data.skills?.join(", ") || "",
            resumeFileUrl: res.data.resumeFileUrl || "",
            githubUrl: res.data.githubUrl || "",
            linkedinUrl: res.data.linkedinUrl || "",
            portfolioUrl: res.data.portfolioUrl || "",
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()), // convert string to array
      };
      const res = await saveResume(payload);
      setMessage(res.message || "Resume saved successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving resume");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-2/3">
        <h2 className="text-2xl font-bold mb-4 text-center">Resume Form</h2>
        {message && <p className="text-blue-600 mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="headline"
            placeholder="Headline"
            value={form.headline}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="summary"
            placeholder="Summary"
            value={form.summary}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="education"
            placeholder="Education"
            value={form.education}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={form.experience}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="resumeFileUrl"
            placeholder="Resume File URL (optional)"
            value={form.resumeFileUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="githubUrl"
            placeholder="GitHub URL"
            value={form.githubUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="linkedinUrl"
            placeholder="LinkedIn URL"
            value={form.linkedinUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="portfolioUrl"
            placeholder="Portfolio URL"
            value={form.portfolioUrl}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save Resume
          </button>
        </form>
      </div>
    </div>
  );
}
