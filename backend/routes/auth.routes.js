// In backend/routes/auth.routes.js
import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js"; // Import controllers

const router = express.Router();

router.post("/signup", signup); // Connect the route to the controller function

// router.post("/login", login);
// router.post("/logout", logout);

export default router;