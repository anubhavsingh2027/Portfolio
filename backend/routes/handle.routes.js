// External Module
import express from "express";
const handleAcess = express.Router();

// controllers
import { wakeup } from "../controllers/hello.controller.js";
import { chatAssistant } from "../controllers/chatAssistant.controller.js";
import { chatAssistant as voiceAssistant } from "../controllers/voiceAssistant..controller.js";
import { contact, speedMail } from "../controllers/contactMail.controller.js";
import { assistantAccess,resumeAccess } from "../controllers/access.controller.js";

handleAcess.get("/", wakeup);
handleAcess.post("/chatAssistant", chatAssistant);
handleAcess.post("/voiceAssistant", voiceAssistant);
handleAcess.post("/contact", contact);
handleAcess.post("/speedResponse", speedMail);
handleAcess.post("/resumeAccess",resumeAccess);
handleAcess.post("/assitantAccess",assistantAccess);

export default handleAcess;
