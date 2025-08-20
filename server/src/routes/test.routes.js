import { Router } from "express";
import { pingServer,failServer } from "../controllers/test.controller.js";

const router = Router();
// Route to ping the server
router.get('/ping', pingServer);
// Route to simulate a server failure
router.get('/fail', failServer);

export default router;