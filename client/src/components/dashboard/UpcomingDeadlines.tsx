import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext.js';
import { Task } from '../../types/index.js';
import {
  Calendar,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ListTodo,
} from 'lucide-react';

export const UpcomingDeadlines: React.FC = () => {
  const { tasks } = useTasks();

  // Sample tasks used only when the real task list is empty.
  const demoTasks: Task[] = [
    {
      id: 'demo-1',
      title: 'Complete React Dashboard',
      description: 'Finish the dashboard UI and make it responsive.',
      status: 'COMPLETED',
      priority: 'HIGH',
      dueDate: new Date().toISOString(),
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'demo-user',
    },
    {
      id: 'demo-2',
      title: 'Build Authentication System',
      description: 'Implement login and registration.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'demo-user',
    },
    {
      id: 'demo-3',
      title: 'Connect PostgreSQL Database',
      description: 'Connect the database to the backend.',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 2 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'demo-user',
    },
    {
      id: 'demo-4',
      title: 'Write Project Documentation',
      description: 'Document APIs and setup instructions.',
      status: 'COMPLETED',
      priority: 'LOW',
      dueDate: new Date().toISOString(),
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'demo-user',
    },
    {
      id: 'demo-5',
      title: 'Test Task Management APIs',
      description: 'Test creating, editing, and completing tasks.',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'demo-user',
    },
  ];

  const displayTasks = tasks.length > 0 ? tasks : demoTasks;

  const completedCount = displayTasks.filter(
    (task) => task.status === 'COMPLETED'
  ).length;

  const incompleteCount = displayTasks.filter(
    (task) => task.status !== 'COMPLETED'
  ).length;

  const openTasksWithDates = displayTasks
    .filter((task) => task.dueDate && task.status !== 'COMPLETED')
    .sort(
      (a, b) =>
        new Date(a.dueDate!).getTime() -
        new Date(b.dueDate!).getTime()
    )
    .slice(0, 4);

  return (
    <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-surface-100/70 to-surface-200/50 p-5 backdrop-blur-2xl shadow-glass">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
            <Calendar className="h-4 w-4" />
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Upcoming Deadlines
            </h3>
            <p className="mt-1 text-[10px] text-slate-500">
              Track your pending work
            </p>
          </div>
        </div>

        <span className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[10px] font-mono font-semibold text-cyan-300">
          {openTasksWithDates.length} scheduled
        </span>
      </div>

      {/* Completed and incomplete summary */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] font-semibold text-slate-400">
              Completed
            </span>
          </div>

          <p className="mt-2 text-xl font-bold text-emerald-300">
            {completedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] p-3">
          <div className="flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-amber-400" />
            <span className="text-[10px] font-semibold text-slate-400">
              Incomplete
            </span>
          </div>

          <p className="mt-2 text-xl font-bold text-amber-300">
            {incompleteCount}
          </p>
        </div>
      </div>

      {/* Upcoming incomplete tasks */}
      <div className="space-y-2.5">
        {openTasksWithDates.map((task) => {
          const dueDate = new Date(task.dueDate!);
          const isOverdue = dueDate.getTime() < Date.now();

          const dateStr = dueDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });

          return (
            <Link
              key={task.id}
              to={`/tasks/${task.id}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.05] bg-surface-200/60 p-3 transition-all hover:border-cyan-500/30 hover:bg-surface-200 hover:shadow-card-glow"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-200 transition-colors group-hover:text-cyan-300">
                  {task.title}
                </p>

                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase ${
                      task.priority === 'HIGH'
                        ? 'bg-rose-500/10 text-rose-400'
                        : task.priority === 'MEDIUM'
                        ? 'bg-purple-500/10 text-purple-300'
                        : 'bg-cyan-500/10 text-cyan-400'
                    }`}
                  >
                    {task.priority}
                  </span>

                  <span
                    className={`text-[10px] ${
                      task.status === 'IN_PROGRESS'
                        ? 'text-cyan-300'
                        : 'text-slate-500'
                    }`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <span
                  className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-mono font-semibold ${
                    isOverdue
                      ? 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                      : 'border-white/[0.08] bg-white/[0.03] text-slate-300'
                  }`}
                >
                  {isOverdue ? (
                    <AlertCircle className="h-3 w-3" />
                  ) : (
                    <Clock className="h-3 w-3" />
                  )}
                  {dateStr}
                </span>

                <ArrowUpRight className="ml-auto mt-1 h-3.5 w-3.5 text-slate-600 transition-colors group-hover:text-cyan-300" />
              </div>
            </Link>
          );
        })}

        {openTasksWithDates.length === 0 && (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-emerald-400" />
            <p className="text-xs font-semibold text-slate-300">
              All caught up!
            </p>
            <p className="mt-1 text-[10px] text-slate-500">
              No upcoming deadlines to worry about.
            </p>
          </div>
        )}
      </div>

      {/* Demo data notice */}
      {tasks.length === 0 && (
        <p className="mt-4 border-t border-white/[0.06] pt-3 text-center text-[10px] text-slate-500">
          Showing sample tasks for preview
        </p>
      )}
    </div>
  );
};