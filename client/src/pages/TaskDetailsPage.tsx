import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/client.js';
import { Task, TaskPriority, TaskStatus } from '../types/index.js';
import { useTasks } from '../context/TaskContext.js';
import { Header } from '../components/dashboard/Header.js';
import { TaskModal } from '../components/tasks/TaskModal.js';
import { DeleteConfirmModal } from '../components/tasks/DeleteConfirmModal.js';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Edit2,
  Trash2,
  AlertCircle,
  Hash,
  User as UserIcon,
  Sparkles,
  Layers,
} from 'lucide-react';

export const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleTask, deleteTask } = useTasks();

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTaskDetails = async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data.task);
    } catch (err: any) {
      console.error('Fetch task details error:', err);
      setError(err.response?.data?.message || 'Milestone not found or unauthorized');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  const handleToggle = async () => {
    if (!task) return;
    try {
      await toggleTask(task.id);
      setTask((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === 'COMPLETED' ? 'TODO' : 'COMPLETED',
            }
          : null
      );
    } catch (err) {
      console.error('Failed to toggle milestone:', err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!task) return;
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      navigate('/dashboard');
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const statusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Completed Milestone</span>
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
            <Clock className="h-4 w-4 text-cyan-400 animate-pulse" />
            <span>In Progress</span>
          </span>
        );
      case 'TODO':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-800/40 px-3.5 py-1.5 text-xs font-semibold text-slate-300">
            <Circle className="h-4 w-4 text-slate-400" />
            <span>To Do</span>
          </span>
        );
    }
  };

  const priorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'HIGH':
        return (
          <span className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-rose-300 shadow-sm shadow-rose-500/10">
            High Priority
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
            Medium Priority
          </span>
        );
      case 'LOW':
      default:
        return (
          <span className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
            Low Priority
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-10 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none -z-10 animate-float-slow" />
      <div className="fixed bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none -z-10 animate-float-delayed" />

      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Link */}
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-surface-100/60 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-purple-500/40 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="h-80 w-full animate-pulse rounded-3xl border border-white/[0.05] bg-surface-100/40" />
        )}

        {/* Error state */}
        {error && (
          <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-8 text-center space-y-3 backdrop-blur-xl">
            <AlertCircle className="h-8 w-8 text-rose-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Milestone Error</h3>
            <p className="text-xs text-rose-300">{error}</p>
            <Link
              to="/dashboard"
              className="inline-block mt-4 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white"
            >
              Return to Dashboard
            </Link>
          </div>
        )}

        {/* Task Details Card */}
        {!isLoading && task && (
          <div className="relative rounded-3xl border border-white/[0.1] bg-surface-100/70 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-7 animate-slide-up">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

            {/* Badges & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.07]">
              <div className="flex flex-wrap items-center gap-2.5">
                {statusBadge(task.status)}
                {priorityBadge(task.priority)}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggle}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    task.status === 'COMPLETED'
                      ? 'border border-white/[0.1] bg-surface-200 text-slate-300 hover:bg-surface-300'
                      : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {task.status === 'COMPLETED' ? 'Mark Incomplete' : 'Mark Completed'}
                  </span>
                </button>

                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-surface-200/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-surface-200 hover:text-white transition-all"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {task.title}
              </h1>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-white/[0.07] bg-surface-200/60 p-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Description
              </span>
              <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                {task.description || (
                  <span className="text-slate-500 italic">No description provided for this milestone.</span>
                )}
              </p>
            </div>

            {/* Metadata Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-white/[0.06] bg-surface-200/40 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Due Date</span>
                </span>
                <p className="text-xs font-medium text-slate-200">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'No target deadline specified'}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-surface-200/40 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-purple-400" />
                  <span>Created At</span>
                </span>
                <p className="text-xs font-medium text-slate-200">
                  {new Date(task.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-surface-200/40 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Hash className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Task Identifier</span>
                </span>
                <p className="text-xs font-mono text-slate-400 truncate">{task.id}</p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-surface-200/40 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <UserIcon className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Assigned User ID</span>
                </span>
                <p className="text-xs font-mono text-slate-400 truncate">{task.userId}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {task && (
        <TaskModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchTaskDetails();
          }}
          taskToEdit={task}
        />
      )}

      {/* Delete Confirmation Modal */}
      {task && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          taskTitle={task.title}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};
