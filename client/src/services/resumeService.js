import axios from "./api"; // axios instance with baseURL: /api/resumes

// Create or update resume
export const saveResume = async (data) => {
  const res = await axios.post("/me", data);
  return res.data;
};

// Get logged-in user's resume
export const getResume = async () => {
  const res = await axios.get("/me");
  return res.data;
};

// Optionally: fetch another user's resume by ID
export const getResumeById = async (id) => {
  const res = await axios.get(`/${id}`);
  return res.data;
};
  