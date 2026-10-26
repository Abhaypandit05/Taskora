import React from 'react';
import {
  Layers,
  CheckCircle2,
  Clock,
  Hourglass,
  Zap,
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext.js';

export const StatsCards: React.FC = () => {
  const { stats, tasks } = useTasks();

  const totalTasks = stats?.totalTasks ?? 0;
  const completedTasks = stats?.completedTasks ?? 0;

  const inProgressTasks = tasks.filter(
    (task) => task.status === 'IN_PROGRESS'
  ).length;

  const pendingTasks = stats?.pendingTasks ?? 0;

  const completionRate =
    totalTasks > 0 ? completedTasks / totalTasks : 0;

  const productivityScore =
    totalTasks > 0
      ? Math.min(
          100,
          Math.round(75 + completionRate * 25)
        )
      : 92;

  const widgets = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      subtext: 'Workspace milestones',
      icon: Layers,
      accent: '#a855f7',
      borderHover: 'hover:border-purple-500/30',
      badge: 'Active',
      badgeColor:
        'border-purple-500/20 bg-purple-500/[0.08] text-purple-300',
      iconColor:
        'border-purple-500/20 bg-purple-500/[0.08] text-purple-400',
    },
    {
      label: 'Completed',
      value: completedTasks,
      subtext: `${
        totalTasks > 0
          ? Math.round(completionRate * 100)
          : 0
      }% completion rate`,
      icon: CheckCircle2,
      accent: '#00e6b8',
      borderHover: 'hover:border-[#00e6b8]/30',
      badge: 'Verified',
      badgeColor:
        'border-[#00e6b8]/20 bg-[#00e6b8]/[0.08] text-[#42ffd4]',
      iconColor:
        'border-[#00e6b8]/20 bg-[#00e6b8]/[0.08] text-[#00e6b8]',
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      subtext: 'Tasks currently underway',
      icon: Clock,
      accent: '#00d9ff',
      borderHover: 'hover:border-cyan-400/30',
      badge: 'In Flight',
      badgeColor:
        'border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300',
      iconColor:
        'border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300',
    },
    {
      label: 'Pending',
      value: pendingTasks,
      subtext: 'Tasks awaiting completion',
      icon: Hourglass,
      accent: '#f59e0b',
      borderHover: 'hover:border-amber-400/30',
      badge: 'Queued',
      badgeColor:
        'border-amber-400/20 bg-amber-400/[0.08] text-amber-300',
      iconColor:
        'border-amber-400/20 bg-amber-400/[0.08] text-amber-300',
    },
    {
      label: 'Productivity Score',
      value: `${productivityScore}%`,
      subtext: 'Estimated workspace score',
      icon: Zap,
      accent: '#00e6b8',
      borderHover: 'hover:border-[#00e6b8]/40',
      badge: productivityScore >= 90
        ? 'Optimal'
        : productivityScore >= 75
          ? 'Good'
          : 'Growing',
      badgeColor:
        'border-[#00e6b8]/20 bg-[#00e6b8]/[0.08] text-[#42ffd4]',
      iconColor:
        'border-[#00e6b8]/20 bg-[#00e6b8]/[0.08] text-[#00e6b8]',
      isGauge: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3.5 md:grid-cols-3 xl:grid-cols-5">
      {widgets.map((widget) => {
        const Icon = widget.icon;

        return (
          <div
            key={widget.label}
            className={`group relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#050b0f]/90 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#071116] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)] sm:p-5 ${widget.borderHover}`}
          >
            {/* Top accent */}
            <div
              className="absolute left-5 right-5 top-0 h-[2px] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${widget.accent}, transparent)`,
              }}
            />

            {/* Card heading */}
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">
                {widget.label}
              </span>

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${widget.iconColor}`}
              >
                <Icon className="h-[17px] w-[17px]" />
              </div>
            </div>

            {/* Value and badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-3xl font-black tracking-tight text-white sm:text-[32px]">
                {widget.value}
              </span>

              <span
                className={`shrink-0 rounded-md border px-1.5 py-1 text-[8px] font-bold uppercase tracking-wider sm:text-[9px] ${widget.badgeColor}`}
              >
                {widget.badge}
              </span>
            </div>

            {/* Supporting information */}
            <p className="mt-3 truncate text-[10px] font-medium text-slate-500 sm:text-[11px]">
              {widget.subtext}
            </p>

            {/* Productivity progress indicator */}
            {widget.isGauge && (
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${productivityScore}%`,
                    background:
                      'linear-gradient(90deg, #00b894, #00e6b8, #42ffd4)',
                    boxShadow:
                      '0 0 10px rgba(0,230,184,0.25)',
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};