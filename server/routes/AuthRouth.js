import express from "express";
import { registerUser, loginUser } from "../controllers/AuthController.js";
import { isAuthenticated } from "../middlewere/isAuthenticated.js";
import { checkAuth } from "../controllers/checkAuth.js";

const router = express.Router();
router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/check-auth", isAuthenticated, checkAuth);
export default router;
