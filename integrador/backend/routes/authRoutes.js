import express from "express";
import { loginUser, logoutUser } from "../controllers/authController.js";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

// Ruta para iniciar sesión
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
