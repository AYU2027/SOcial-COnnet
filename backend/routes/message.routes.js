import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Route to get messages between the logged-in user and the user specified by :id
router.get("/:id", protectRoute, getMessages);

// Route to send a message to the user specified by :id
router.post("/send/:id", protectRoute, sendMessage);

export default router;