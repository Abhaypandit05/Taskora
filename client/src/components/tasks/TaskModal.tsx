import React, { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus } from '../../types/index.js';
import { useTasks } from '../../context/TaskContext.js';
import { X, Calendar, AlertCircle, Sparkles } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus?: TaskStatus;
  taskToEdit?: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  defaultStatus = 'TODO',
  taskToEdit,
}) => {
  const { createTask, updateTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || '');
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setDueDate(taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : '');
    } else {
      setTitle('');
      setDescription('');
      setStatus(defaultStatus);
      setPriority('MEDIUM');
      setDueDate('');
    }
    setError(null);
  }, [taskToEdit, defaultStatus, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (taskToEdit) {
        await updateTask(taskToEdit.id, {
          title: title.trim(),
          description: description.trim() || null,
          status,
          priority,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        });
      } else {
        await createTask({
          title: title.trim(),
          description: description.trim() || undefined,
          status,
          priority,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        });
      }
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#030408]/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg rounded-3xl border border-white/[0.1] bg-[#090d18]/95 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl z-10 animate-slide-up">
        {/* Subtle top gradient accent */}
        <div className="absolute -top-[1px] left-10 right-10 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white tracking-tight">
              {taskToEdit ? 'Edit Milestone' : 'Create New Milestone'}
            </h3>
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/30 px-3.5 py-2.5 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Integrate PostgreSQL connection pool with Prisma"
              className="w-full rounded-xl border border-white/[0.08] bg-surface-200/90 px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-purple-500/50 focus:shadow-aurora-glow focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Add technical requirements, scope, or acceptance criteria..."
              className="w-full rounded-xl border border-white/[0.08] bg-surface-200/90 px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-purple-500/50 focus:shadow-aurora-glow focus:outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-xl border border-white/[0.08] bg-surface-200/90 px-3 py-2 text-xs font-semibold text-slate-200 focus:border-purple-500 focus:outline-none transition-all cursor-pointer"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-xl border border-white/[0.08] bg-surface-200/90 px-3 py-2 text-xs font-semibold text-slate-200 focus:border-purple-500 focus:outline-none transition-all cursor-pointer"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-surface-200/90 px-3.5 py-2 text-xs font-medium text-slate-200 focus:border-purple-500 focus:outline-none transition-all"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-white/[0.07]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/[0.06] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow-aurora-glow hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : taskToEdit ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
