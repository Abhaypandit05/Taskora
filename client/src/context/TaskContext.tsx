import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/client.js';
import { Task, TaskStats, TaskPriority, TaskStatus } from '../types/index.js';
import { useAuth } from './AuthContext.js';

interface TaskContextType {
  tasks: Task[];
  stats: TaskStats | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: string;
  priorityFilter: string;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: string) => void;
  setPriorityFilter: (priority: string) => void;
  fetchTasks: () => Promise<void>;
  fetchStats: () => Promise<void>;
  createTask: (data: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string | null;
  }) => Promise<Task>;
  updateTask: (id: string, data: Partial<Task>) => Promise<Task>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const fetchStats = useCallback(async () => {
    if (!user) return;
    try {
      const res = await api.get('/tasks/stats/summary');
      setStats(res.data.stats);
    } catch (err) {
      console.error('Failed to fetch task stats:', err);
    }
  }, [user]);

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get('/tasks', {
        params: {
          search: searchQuery || undefined,
          status: statusFilter !== 'ALL' ? statusFilter : undefined,
          priority: priorityFilter !== 'ALL' ? priorityFilter : undefined,
        },
      });
      setTasks(res.data.tasks || []);
    } catch (err: any) {
      console.error('Failed to fetch tasks:', err);
      setError(err.response?.data?.message || 'Failed to load tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [user, searchQuery, statusFilter, priorityFilter]);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchStats();
    } else {
      setTasks([]);
      setStats(null);
    }
  }, [user, fetchTasks, fetchStats]);

  const createTask = async (data: {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string | null;
  }) => {
    const res = await api.post('/tasks', data);
    const newTask = res.data.task;
    setTasks((prev) => [newTask, ...prev]);
    fetchStats();
    return newTask;
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    const res = await api.put(`/tasks/${id}`, data);
    const updated = res.data.task;
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    fetchStats();
    return updated;
  };

  const toggleTask = async (id: string) => {
    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newStatus: TaskStatus = t.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
          return { ...t, status: newStatus };
        }
        return t;
      })
    );

    try {
      const res = await api.patch(`/tasks/${id}/toggle`);
      const updated = res.data.task;
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      fetchStats();
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
      fetchTasks(); // rollback on error
    }
  };

  const deleteTask = async (id: string) => {
    // Optimistic delete
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await api.delete(`/tasks/${id}`);
      fetchStats();
    } catch (err) {
      console.error('Failed to delete task:', err);
      fetchTasks(); // rollback on error
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        isLoading,
        error,
        searchQuery,
        statusFilter,
        priorityFilter,
        setSearchQuery,
        setStatusFilter,
        setPriorityFilter,
        fetchTasks,
        fetchStats,
        createTask,
        updateTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
