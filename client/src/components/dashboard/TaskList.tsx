import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext.js';
import { Task, TaskPriority, TaskStatus } from '../../types/index.js';
import {
  Search,
  Plus,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  AlertCircle,
  Inbox,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface TaskListProps {
  onOpenCreateModal: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  onOpenCreateModal,
  onEditTask,
  onDeleteTask,
}) => {
  const {
    tasks,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    toggleTask,
    fetchTasks,
  } = useTasks();

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Completed</span>
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>In Progress</span>
          </span>
        );
      case 'TODO':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/40 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span>To Do</span>
          </span>
        );
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'HIGH':
        return (
          <span className="rounded-lg border border-purple-500/40 bg-purple-500/10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 shadow-sm shadow-purple-500/20">
            High Priority
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300">
            Medium
          </span>
        );
      case 'LOW':
      default:
        return (
          <span className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
            Low
          </span>
        );
    }
  };

  const getProgressPercentage = (status: TaskStatus) => {
    if (status === 'COMPLETED') return 100;
    if (status === 'IN_PROGRESS') return 65;
    return 20;
  };

  const getCardGlowClass = (task: Task) => {
    if (task.status === 'COMPLETED') return 'glow-emerald-hover';
    if (task.priority === 'HIGH') return 'glow-purple-hover';
    if (task.priority === 'MEDIUM') return 'glow-blue-hover';
    return 'glow-cyan-hover';
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              My Tasks
            </h2>
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 text-xs font-mono font-bold text-cyan-300 shadow-sm">
              {tasks.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Active milestones, sprint tracking, and deliverables
          </p>
        </div>

        {/* Add Task Button */}
        <button
          onClick={onOpenCreateModal}
          className="neon-button-cyan flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-3xl border border-white/[0.08] bg-surface-100/70 p-3.5 backdrop-blur-2xl shadow-glass">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by task title, description, or keyword..."
              className="w-full rounded-2xl border border-white/[0.08] bg-[#0c101d] py-2 pl-10 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-cyan-500/50 focus:shadow-cyan-glow focus:outline-none transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-white/[0.08] bg-[#0c101d] px-3.5 py-2 text-xs font-semibold text-slate-300 focus:border-cyan-500 focus:outline-none transition-all cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-2xl border border-white/[0.08] bg-[#0c101d] px-3.5 py-2 text-xs font-semibold text-slate-300 focus:border-cyan-500 focus:outline-none transition-all cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-center justify-between rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchTasks}
            className="flex items-center gap-1.5 rounded-xl bg-rose-500/20 px-3 py-1.5 text-xs font-semibold hover:bg-rose-500/30 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-24 w-full animate-pulse rounded-3xl border border-white/[0.05] bg-surface-100/40"
            />
          ))}
        </div>
      )}

      {/* Task Cards: Futuristic Floating Panels */}
      {!isLoading && tasks.length > 0 && (
        <div className="space-y-3.5">
          {tasks.map((task) => {
            const isCompleted = task.status === 'COMPLETED';
            const progress = getProgressPercentage(task.status);
            const isOverdue =
              task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted;
            const glowClass = getCardGlowClass(task);

            return (
              <div
                key={task.id}
                className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border p-4 sm:p-5 transition-all duration-300 ${
                  isCompleted
                    ? 'border-white/[0.04] bg-surface-300/40 opacity-75'
                    : `border-white/[0.08] bg-gradient-to-r from-surface-100/80 via-surface-200/60 to-surface-300/40 backdrop-blur-2xl shadow-glass hover:-translate-y-1 ${glowClass}`
                }`}
              >
                {/* Left: Checkbox & Content */}
                <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                  {/* Futuristic Glowing Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-0.5 sm:mt-0 flex h-6 w-6 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${
                      isCompleted
                        ? 'border-emerald-500 bg-emerald-500/25 text-emerald-400 shadow-sm shadow-emerald-500/40'
                        : 'border-white/[0.18] bg-surface-200/80 hover:border-cyan-400 hover:bg-surface-100'
                    }`}
                    title={isCompleted ? 'Mark incomplete' : 'Mark completed'}
                  >
                    {isCompleted ? (
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-cyan-400/40 transition-colors" />
                    )}
                  </button>

                  {/* Title & Description */}
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/tasks/${task.id}`}
                      className={`text-sm sm:text-base font-bold transition-colors hover:text-cyan-300 block truncate ${
                        isCompleted ? 'text-slate-400 line-through' : 'text-slate-100'
                      }`}
                    >
                      {task.title}
                    </Link>

                    {task.description && (
                      <p className="mt-1 text-xs text-slate-400 line-clamp-1 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    {/* Progress Indicator Bar */}
                    <div className="mt-2.5 flex items-center gap-2 max-w-xs">
                      <div className="w-full bg-surface-300/80 rounded-full h-1 overflow-hidden border border-white/[0.05]">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                              : task.status === 'IN_PROGRESS'
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                              : 'bg-slate-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {progress}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Badges, Date & Action Controls */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                  <div className="flex items-center gap-2 flex-wrap">
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}

                    {task.dueDate && (
                      <span
                        className={`flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded-xl border ${
                          isOverdue
                            ? 'border-rose-500/30 bg-rose-500/10 text-rose-300 font-bold'
                            : 'border-white/[0.07] bg-surface-200/50 text-slate-400'
                        }`}
                        title={isOverdue ? 'Overdue milestone' : 'Due date'}
                      >
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>

                  {/* Actions Menu / Buttons */}
                  <div className="flex items-center gap-1 pl-1">
                    <button
                      onClick={() => onEditTask(task)}
                      className="rounded-xl p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white transition-colors"
                      title="Edit task"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task)}
                      className="rounded-xl p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <Link
                      to={`/tasks/${task.id}`}
                      className="rounded-xl p-2 text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                      title="Task details"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.08] bg-surface-100/30 p-12 text-center backdrop-blur-2xl">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-3 shadow-cyan-glow">
            <Inbox className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-white">No tasks found</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm leading-relaxed">
            {searchQuery || statusFilter !== 'ALL' || priorityFilter !== 'ALL'
              ? 'No tasks match your filter criteria. Try adjusting your search query.'
              : 'Your workspace is clear. Create your first task to start organizing your project.'}
          </p>
          <button
            onClick={onOpenCreateModal}
            className="neon-button-cyan mt-5 flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Create New Task</span>
          </button>
        </div>
      )}
    </div>
  );
};
