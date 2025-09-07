import { queryHFModel } from "../utils/huggingFace.js";

export const enhanceSummary = async (req, res) => {
  try {
    const { summary } = req.body; // matches your frontend
    if (!summary) return res.status(400).json({ success: false, message: "Summary is required" });

    const enhanced = await queryHFModel(`Enhance this professional summary:\n\n${summary}`);

    res.status(200).json({ success: true, enhancedSummary: enhanced });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
