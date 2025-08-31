// src/pages/ResumeForm.jsx
import { useState, useEffect } from "react";
import { saveResume, getResume } from "../services/resumeService";

export default function ResumeForm() {
  const [form, setForm] = useState({
    headline: "",
    summary: "",
    education: [],      // array of objects
    experience: [],     // array of objects
    skills: "",         // comma-separated string
    resumeFileUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    portfolioUrl: "",
  });

  const [message, setMessage] = useState("");

  // Load existing resume
  useEffect(() => {
    getResume()
      .then((res) => {
        if (res?.data) {
          const data = res.data;
          setForm({
            headline: data.headline || "",
            summary: data.summary || "",
            education: data.education || [],
            experience: data.experience || [],
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

  // Generic input change for simple string fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Education handlers
  const handleEducationChange = (index, e) => {
    const newEducation = [...form.education];
    newEducation[index][e.target.name] = e.target.value;
    setForm({ ...form, education: newEducation });
  };

  const addEducation = () => {
    setForm({
      ...form,
      education: [...form.education, { school: "", degree: "", year: "" }],
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...form.education];
    newEducation.splice(index, 1);
    setForm({ ...form, education: newEducation });
  };

  // Experience handlers
  const handleExperienceChange = (index, e) => {
    const newExperience = [...form.experience];
    newExperience[index][e.target.name] = e.target.value;
    setForm({ ...form, experience: newExperience });
  };

  const addExperience = () => {
    setForm({
      ...form,
      experience: [...form.experience, { role: "", company: "", duration: "" }],
    });
  };

  const removeExperience = (index) => {
    const newExperience = [...form.experience];
    newExperience.splice(index, 1);
    setForm({ ...form, experience: newExperience });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Prepare payload with proper structure
    const payload = {
      ...form,
      skills: form.skills
        ? form.skills.split(",").map((s) => s.trim())
        : [],
      education: form.education?.map((edu) => ({
        school: edu.school || "",
        degree: edu.degree || "",
        year: edu.year || "",
      })) || [],
      experience: form.experience?.map((exp) => ({
        role: exp.role || "",
        company: exp.company || "",
        duration: exp.duration || "",
      })) || [],
    };

    const res = await saveResume(payload);
    setMessage(res.data?.message || "Resume saved successfully!");
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

          {/* Education */}
          <h3 className="font-semibold mt-2">Education</h3>
          {form.education.map((edu, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                type="text"
                name="school"
                placeholder="School"
                value={edu.school}
                onChange={(e) => handleEducationChange(idx, e)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(idx, e)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleEducationChange(idx, e)}
                className="border p-2 rounded"
              />
              <button type="button" onClick={() => removeEducation(idx)} className="bg-red-500 text-white px-2 rounded">X</button>
            </div>
          ))}
          <button type="button" onClick={addEducation} className="bg-blue-500 text-white px-2 py-1 rounded">
            Add Education
          </button>

          {/* Experience */}
          <h3 className="font-semibold mt-2">Experience</h3>
          {form.experience.map((exp, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(idx, e)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(idx, e)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(idx, e)}
                className="border p-2 rounded"
              />
              <button type="button" onClick={() => removeExperience(idx)} className="bg-red-500 text-white px-2 rounded">X</button>
            </div>
          ))}
          <button type="button" onClick={addExperience} className="bg-blue-500 text-white px-2 py-1 rounded">
            Add Experience
          </button>

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
