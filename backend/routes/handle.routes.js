// External Module
import express from "express";
const handleAcess = express.Router();

// controllers
import { chatAssistant } from "../controllers/chatAssistant.controller.js";
import { chatAssistant as voiceAssistant } from "../controllers/voiceAssistant..controller.js";
import { contact, speedMail } from "../controllers/contactMail.controller.js";
import {
  assistantAccess,
  resumeAccess,
  visitorAccess,
} from "../controllers/access.controller.js";
import { leetCodeStats } from "../controllers/leetcode.controller.js";

handleAcess.get("/health", (req, res, next) => {
  return res.status(200).json({ status: true });
});
handleAcess.post("/chatAssistant", chatAssistant);
handleAcess.post("/voiceAssistant", voiceAssistant);
handleAcess.post("/contact", contact);
handleAcess.post("/speedResponse", speedMail);
handleAcess.post("/resumeAccess", resumeAccess);
handleAcess.post("/assitantAccess", assistantAccess);
handleAcess.post("/visitorAccess", visitorAccess);
handleAcess.get("/leetcode/stats", leetCodeStats);

export default handleAcess;
