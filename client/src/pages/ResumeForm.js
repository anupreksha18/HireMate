// src/pages/ResumeForm.jsx
import { useState, useEffect } from "react";
import { saveResume, getResume } from "../services/resumeService";
import { enhanceSummary } from "../services/aiService"; // import your AI service

export default function ResumeForm() {
  const [form, setForm] = useState({
    headline: "",
    summary: "",
    education: [{ school: "", degree: "", year: "" }],
    experience: [{ role: "", company: "", duration: "" }],
    projects: [{ title: "", description: "", link: "" }],
    certifications: [{ name: "", issuer: "", year: "" }],
    achievements: [{ title: "", description: "" }],
    skills: "",
    resumeFileUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const [message, setMessage] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    getResume()
      .then((res) => {
        if (res?.data) {
          const data = res.data;
          setForm({
            headline: data.headline || "",
            summary: data.summary || "",
            education: data.education?.length
              ? data.education
              : [{ school: "", degree: "", year: "" }],
            experience: data.experience?.length
              ? data.experience
              : [{ role: "", company: "", duration: "" }],
            projects: data.projects?.length
              ? data.projects
              : [{ title: "", description: "", link: "" }],
            certifications: data.certifications?.length
              ? data.certifications
              : [{ name: "", issuer: "", year: "" }],
            achievements: data.achievements?.length
              ? data.achievements
              : [{ title: "", description: "" }],
            skills: data.skills?.join(", ") || "",
            resumeFileUrl: data.resumeFileUrl || "",
            githubUrl: data.githubUrl || "",
            linkedinUrl: data.linkedinUrl || "",
            portfolioUrl: data.portfolioUrl || "",
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (section, index, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [name]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const addItem = (section, template) => {
    setForm((prev) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  };

  const removeItem = (section, index) => {
    setForm((prev) => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [section]: newArray.length
          ? newArray
          : [
              Object.keys(newArray[0] || {}).reduce(
                (acc, key) => ({ ...acc, [key]: "" }),
                {}
              ),
            ],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills
          ? form.skills.split(",").map((s) => s.trim())
          : [],
        education: form.education.filter(
          (e) => e.school || e.degree || e.year
        ),
        experience: form.experience.filter(
          (ex) => ex.role || ex.company || ex.duration
        ),
        projects: form.projects.filter(
          (p) => p.title || p.description || p.link
        ),
        certifications: form.certifications.filter(
          (c) => c.name || c.issuer || c.year
        ),
        achievements: form.achievements.filter(
          (a) => a.title || a.description
        ),
        resumeFileUrl: form.resumeFileUrl || null,
        githubUrl: form.githubUrl || null,
        linkedinUrl: form.linkedinUrl || null,
        portfolioUrl: form.portfolioUrl || null,
      };

      const res = await saveResume(payload);
      setMessage(res.data?.message || "Resume saved successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving resume");
    }
  };

  const handleEnhanceSummary = async () => {
    if (!form.summary) return;
    setLoadingSummary(true);
    try {
      const data = await enhanceSummary(form.summary);
      setForm((prev) => ({ ...prev, summary: data.summary }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to enhance summary");
    }
    setLoadingSummary(false);
  };

  const renderSection = (section, fields, placeholderMap) => (
    <>
      {form[section].map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2"
        >
          {fields.map((field) => (
            <input
              key={field + idx}
              type="text"
              name={field}
              placeholder={placeholderMap[field]}
              value={item[field] || ""}
              onChange={(e) => handleArrayChange(section, idx, e)}
              className="border p-2 rounded w-full"
            />
          ))}
          {form[section].length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(section, idx)}
              className="bg-red-500 text-white px-2 rounded h-10 self-center"
            >
              X
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          addItem(
            section,
            fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
          )
        }
        className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
      >
        + Add {section.slice(0, 1).toUpperCase() + section.slice(1)}
      </button>
    </>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-3">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Resume Form</h2>
        {message && <p className="text-blue-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="headline"
            placeholder="Headline"
            value={form.headline}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          {/* Summary with AI button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              name="summary"
              placeholder="Summary"
              value={form.summary}
              onChange={handleChange}
              className="border p-2 rounded flex-1"
              rows={3}
            />
            <button
              type="button"
              onClick={handleEnhanceSummary}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 min-w-[150px]"
              disabled={loadingSummary}
            >
              {loadingSummary ? "Enhancing..." : "Enhance Summary"}
            </button>
          </div>

          {/* Sections */}
          <h3 className="font-semibold mt-3">Education</h3>
          {renderSection("education", ["school", "degree", "year"], {
            school: "School",
            degree: "Degree",
            year: "Year",
          })}

          <h3 className="font-semibold mt-3">Experience</h3>
          {renderSection("experience", ["role", "company", "duration"], {
            role: "Role",
            company: "Company",
            duration: "Duration",
          })}

          <h3 className="font-semibold mt-3">Projects</h3>
          {renderSection("projects", ["title", "description", "link"], {
            title: "Title",
            description: "Description",
            link: "Link",
          })}

          <h3 className="font-semibold mt-3">Certifications</h3>
          {renderSection("certifications", ["name", "issuer", "year"], {
            name: "Certificate Name",
            issuer: "Issuer",
            year: "Year",
          })}

          <h3 className="font-semibold mt-3">Achievements</h3>
          {renderSection("achievements", ["title", "description"], {
            title: "Title",
            description: "Description",
          })}

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="githubUrl"
            placeholder="GitHub URL"
            value={form.githubUrl}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="linkedinUrl"
            placeholder="LinkedIn URL"
            value={form.linkedinUrl}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4"
          >
            Save Resume
          </button>
        </form>
      </div>
    </div>
  );
}
