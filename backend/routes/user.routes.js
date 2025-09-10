import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers, getFriends } from "../controllers/user.controller.js";

const router = express.Router();

// Route to get ALL users (for searching)
router.get("/all", protectRoute, getUsers);

// Route to get ONLY friends (for the sidebar)
router.get("/friends", protectRoute, getFriends);

export default router;