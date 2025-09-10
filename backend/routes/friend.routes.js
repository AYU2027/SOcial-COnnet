import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend,
    getFriendRequests
} from "../controllers/friend.controller.js";

const router = express.Router();

// Friend Request Routes
router.post("/send/:id", protectRoute, sendFriendRequest);
router.post("/accept/:id", protectRoute, acceptFriendRequest);
router.post("/decline/:id", protectRoute, declineFriendRequest);
router.get("/requests", protectRoute, getFriendRequests);

// Existing Friend Management
router.post("/remove/:id", protectRoute, removeFriend);

export default router;