import express from 'express';
import TaskController from '../controllers/taskController.js';

const router = express.Router();

router.post('/create', TaskController.createTask);
router.get('/tasks', TaskController.getTasks);

export default router;