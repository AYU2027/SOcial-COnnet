import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addFriend } from "../controllers/friend.controller.js";

const router = express.Router();

// Route to add a friend. The :id is the ID of the user to be added.
router.post("/add/:id", protectRoute, addFriend);

// We will add routes for removeFriend, etc., here later

export default router;