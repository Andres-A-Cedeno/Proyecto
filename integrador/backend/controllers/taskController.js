import TaskModel from '../models/taskModel.js';

class TaskController {
    static async createTask(req, res) {
        try {
            const newTask = await TaskModel.createTask(req.body);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getTasks(req, res) {
        try {
            console.log("Solicitud recibida en /api/tasks"); // Verifica si esto se imprime
            const tasks = await TaskModel.getAllTasks();
            console.log("Tareas obtenidas:", tasks); // Verifica si las tareas se obtienen correctamente
            res.status(200).json(tasks);
        } catch (error) {
            console.error("Error al obtener tareas:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

export default TaskController;