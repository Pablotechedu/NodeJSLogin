import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ruta publica
router.post("/login", login);

// Rutas protegidas
router.post("/register", authenticateToken, register);
router.get("/profile", authenticateToken, getProfile);

export default router;
