// src/services/aiService.js
import axios from "axios";

const aiAxios = axios.create({
  baseURL: "/api/ai",
});

export const enhanceSummary = async (summary) => {
  const res = await aiAxios.post("/enhance-summary", { summary });
  return res.data;
};
