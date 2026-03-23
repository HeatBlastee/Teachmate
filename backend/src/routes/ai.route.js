import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { chatWithAI } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/ai/chat", protectRoute, chatWithAI);

export default router;
