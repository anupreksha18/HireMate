import axios from "axios";
 axios.defaults.withCredentials = true;

 export const getMyResume = () => axios.get("/api/resumes/me");
 export const createOrUpdateResume = (resumeData) => axios.post("/api/resumes", resumeData);
 export const deleteResume = () => axios.delete("/api/resumes/me");