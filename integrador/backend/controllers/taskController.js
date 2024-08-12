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
            const tasks = await TaskModel.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default TaskController;