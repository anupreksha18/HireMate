import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createOrUpdateResume } from "../controllers/resume.controller.js";
import { getMyResume } from "../controllers/resume.controller.js";
import { deleteResume } from "../controllers/resume.controller.js";
const router = Router();

// Create or Update Resume
router.post("/me", auth, createOrUpdateResume);  
// router.put("/update", auth, createOrUpdateResume);   
router.get("/me", auth,getMyResume);
router.delete("/me",auth,deleteResume);
export default router;
