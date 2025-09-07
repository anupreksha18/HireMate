    import express from "express";
import { enhanceSummary } from "../controllers/ai.controller.js";

import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/enhance-summary", auth, enhanceSummary);

export default router;
