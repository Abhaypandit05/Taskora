import React from 'react';
import {
  Activity,
  CheckCircle2,
  PlusCircle,
  Database,
} from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const activities = [
    {
      id: 1,
      user: 'Alex Morgan',
      action: 'Completed milestone',
      target: 'JWT Authentication & Bcrypt Hashing',
      time: '12m ago',
      color: 'text-[#00e6b8]',
      icon: CheckCircle2,
    },
    {
      id: 2,
      user: 'Sarah Chen',
      action: 'Deployed schema',
      target: 'PostgreSQL Prisma migrations',
      time: '42m ago',
      color: 'text-[#c084fc]',
      icon: Database,
    },
    {
      id: 3,
      user: 'Alex Morgan',
      action: 'Initialized task',
      target: 'Distributed Redis caching suite',
      time: '2h ago',
      color: 'text-[#00d9ff]',
      icon: PlusCircle,
    },
  ];

  return (
    <section className="rounded-[28px] border border-white/[0.09] bg-[#03090d]/90 p-5 shadow-[0_0_30px_rgba(0,230,184,0.025)] backdrop-blur-xl transition-colors duration-300 hover:border-[#00e6b8]/15 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/[0.07] pb-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-purple-500/25 bg-purple-500/[0.08] text-purple-400">
            <Activity className="h-4 w-4" />
          </div>

          <h3 className="truncate text-xs font-extrabold uppercase tracking-wide text-slate-200">
            Telemetry Feed
          </h3>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold text-[#00e6b8]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#00e6b8]" />
          <span>Active</span>
        </div>
      </div>

      {/* Activity list */}
      <div className="space-y-3">
        {activities.map((act) => {
          const Icon = act.icon;

          return (
            <article
              key={act.id}
              className="group flex min-w-0 items-start gap-3 rounded-2xl border border-white/[0.055] bg-[#071217]/70 p-3 transition-all duration-300 hover:border-[#00e6b8]/20 hover:bg-[#09171b]"
            >
              {/* Activity icon */}
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.035] transition-colors group-hover:border-[#00e6b8]/15">
                <Icon className={`h-4 w-4 ${act.color}`} />
              </div>

              {/* Activity details */}
              <div className="min-w-0 flex-1">
                <p className="break-words text-xs leading-5 text-slate-400">
                  <span className="font-bold text-slate-100">
                    {act.user}
                  </span>{' '}
                  {act.action}
                </p>

                <p className="mt-0.5 truncate font-mono text-[10px] leading-4 text-[#00d9ff]/80">
                  {act.target}
                </p>
              </div>

              {/* Timestamp */}
              <span className="shrink-0 pt-0.5 font-mono text-[10px] text-slate-500">
                {act.time}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
};