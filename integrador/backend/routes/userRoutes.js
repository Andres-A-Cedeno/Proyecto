// routes/userRoutes.js

import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;
