import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/users", userController.getAllUsers); //RESTACATA TODOS LOS USUARIOS
router.get("/users/:id", userController.getUserById);
router.post('/new_users', userController.createUser); //CREA UN NUEVO USUARIO
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.post('/login', userController.loginUser); // Ruta para iniciar sesión

export default router;