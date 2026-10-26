import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
  getTaskStats,
} from '../controllers/taskController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

// All task routes require JWT authentication
router.use(authenticateJWT);

router.get('/stats/summary', getTaskStats);
router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTaskCompletion);
router.delete('/:id', deleteTask);

export default router;
