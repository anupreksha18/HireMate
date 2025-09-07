import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("./.env") });

const HF_API_KEY = process.env.HF_API_KEY;
if (!HF_API_KEY) throw new Error("HF_API_KEY not defined");

export const queryHFModel = async (text) => {
  try {
    const MODEL_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

    const response = await axios.post(
      MODEL_URL,
      {
        inputs: text,
        parameters: { max_length: 200, min_length: 50, do_sample: false },
      },
      {
        headers: { Authorization: `Bearer ${HF_API_KEY}` },
       timeout: 180000, // 3 minutes

      }
    );

    // Normalize response
    if (Array.isArray(response.data) && response.data[0]?.summary_text) {
      return response.data[0].summary_text;
    } else if (response.data?.summary_text) {
      return response.data.summary_text;
    } else if (response.data?.error) {
      console.error("HF model error:", response.data.error);
      return `Error from model: ${response.data.error}`;
    } else {
      console.warn("Unexpected HF response:", response.data);
      return "No output from model";
    }
  } catch (err) {
    console.error("HF API error:", err.response?.data || err.message);
    throw new Error("Failed to get response from Hugging Face");
  }
};
