import express from "express";
import TaskController from "../controllers/taskController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/tasks/create", authenticateToken, TaskController.createTask);

// Ruta para obtener todas las tareas o filtrar por usuario_id como parámetro de consulta
router.get("/getAlltasks", TaskController.getTasks);

// Ruta para obtener tareas por id de usuario
router.get(
  "/tasks/user/:id",
  authenticateToken,
  TaskController.getTasksByUserId
);

export default router;
