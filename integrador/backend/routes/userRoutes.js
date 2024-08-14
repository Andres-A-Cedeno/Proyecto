import express from "express";
import * as userController from "../controllers/userController.js";
import * as authController from "../controllers/authController.js"; // Importar authController
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/getAllusers", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/new_users", userController.createUser);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser); // Usar el controlador de auth para login

export default router;
