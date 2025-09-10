import express from "express";
import { sendMessage, getMessages, deleteMessage } from "../controllers/message.controller.js"; // <-- Import deleteMessage
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

// --- NEW ROUTE ---
// The :id parameter is the ID of the message to be deleted
router.delete("/:id", protectRoute, deleteMessage);

export default router;