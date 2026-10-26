import { Response } from 'express';
import { AuthRequest } from '../types/index.js';
import { dbService, TaskPriority, TaskStatus } from '../services/db.js';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { status, priority, search } = req.query;

    const tasks = await dbService.getTasksForUser(userId, {
      status: status as string,
      priority: priority as string,
      search: search as string,
    });

    res.json({ tasks });
  } catch (error: any) {
    console.error('getTasks error:', error);
    res.status(500).json({ message: 'Failed to retrieve tasks' });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const task = await dbService.getTaskById(id, userId);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json({ task });
  } catch (error: any) {
    console.error('getTaskById error:', error);
    res.status(500).json({ message: 'Failed to retrieve task' });
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { title, description, status, priority, dueDate } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      res.status(400).json({ message: 'Task title is required' });
      return;
    }

    // Validate enum values if provided
    const validStatuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
    const validPriorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];

    if (status && !validStatuses.includes(status)) {
      res.status(400).json({ message: 'Invalid status. Allowed: TODO, IN_PROGRESS, COMPLETED' });
      return;
    }

    if (priority && !validPriorities.includes(priority)) {
      res.status(400).json({ message: 'Invalid priority. Allowed: LOW, MEDIUM, HIGH' });
      return;
    }

    const task = await dbService.createTask({
      title: title.trim(),
      description: description ? description.trim() : null,
      status: status || 'TODO',
      priority: priority || 'MEDIUM',
      dueDate: dueDate || null,
      userId,
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error: any) {
    console.error('createTask error:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    if (title !== undefined && (!title || typeof title !== 'string' || !title.trim())) {
      res.status(400).json({ message: 'Task title cannot be empty' });
      return;
    }

    const updatedTask = await dbService.updateTask(id, userId, {
      title: title ? title.trim() : undefined,
      description: description !== undefined ? (description ? description.trim() : null) : undefined,
      status,
      priority,
      dueDate,
    });

    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }

    res.json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error: any) {
    console.error('updateTask error:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const toggleTaskCompletion = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const updatedTask = await dbService.toggleTaskCompletion(id, userId);

    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }

    res.json({ message: 'Task status toggled', task: updatedTask });
  } catch (error: any) {
    console.error('toggleTaskCompletion error:', error);
    res.status(500).json({ message: 'Failed to toggle task completion' });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const success = await dbService.deleteTask(id, userId);

    if (!success) {
      res.status(404).json({ message: 'Task not found or unauthorized' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    console.error('deleteTask error:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

export const getTaskStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const stats = await dbService.getDashboardStats(userId);
    res.json({ stats });
  } catch (error: any) {
    console.error('getTaskStats error:', error);
    res.status(500).json({ message: 'Failed to retrieve task statistics' });
  }
};
