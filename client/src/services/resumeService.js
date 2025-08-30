import api from "./api";

// Create or Update resume
export const saveResume = async (data) => {
  const res = await api.post("/resumes", data); // assuming backend route POST /api/resumes
  return res.data;
};

// Get logged in user's resume
export const getResume = async () => {
  const res = await api.get("/resumes/me");
  return res.data;
};

// Optionally: Fetch another user’s resume by ID
export const getResumeById = async (id) => {
  const res = await api.get(`/resumes/${id}`);
  return res.data;
};
