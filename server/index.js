import { app } from "./app.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("OpenAI Key loaded:", !!process.env.OPENAI_API_KEY);

    console.log(` Server is running on http://localhost:${PORT}`);
});