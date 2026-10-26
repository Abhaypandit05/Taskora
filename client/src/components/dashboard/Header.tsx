import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { useTasks } from '../../context/TaskContext.js';
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  Clock,
  Flame,
  X,
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
}) => {
  const { user } = useAuth();
  const { searchQuery, setSearchQuery, stats } = useTasks();

  const [showNotifications, setShowNotifications] = useState(false);

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const firstName = user?.name
    ? user.name.split(' ')[0]
    : 'Engineer';

  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : 'U';

  const pendingTasks = stats?.pendingTasks ?? 0;
  const highPriorityTasks = stats?.highPriorityTasks ?? 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#03090d]/95 backdrop-blur-2xl">
      {/* Subtle top accent */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#00e6b8]/30 to-transparent" />

      <div className="mx-auto flex h-[70px] w-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile menu and welcome message */}
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00e6b8]/15 bg-[#071217] text-slate-400 transition-all hover:border-[#00e6b8]/40 hover:bg-[#00e6b8]/[0.06] hover:text-[#00e6b8] md:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-extrabold tracking-tight text-white sm:text-base">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-[#42ffd4] to-[#00d9ff] bg-clip-text text-transparent">
                  {firstName}
                </span>
              </h2>

              <Sparkles className="hidden h-4 w-4 shrink-0 text-[#00e6b8] sm:block" />
            </div>

            <p className="mt-1 hidden text-[11px] font-medium text-slate-400 sm:block">
              {todayFormatted} · {pendingTasks} pending tasks today
            </p>
          </div>
        </div>

        {/* Center: Global task search */}
        <div className="mx-3 hidden min-w-0 max-w-[520px] flex-1 md:flex lg:mx-8">
          <div className="group relative w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#00e6b8]" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Quick search tasks, tags, or priorities..."
              aria-label="Search tasks"
              className="w-full rounded-2xl border border-[#00e6b8]/20 bg-[#071217]/90 py-2.5 pl-10 pr-10 text-xs text-slate-200 outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-[#00e6b8]/30 focus:border-[#00e6b8]/50 focus:bg-[#09171b] focus:ring-4 focus:ring-[#00e6b8]/[0.05]"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition-colors hover:text-[#00e6b8]"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Notifications and user profile */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowNotifications((previous) => !previous)
              }
              className={`relative flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300 ${
                showNotifications
                  ? 'border-[#00e6b8]/40 bg-[#00e6b8]/[0.08] text-[#00e6b8]'
                  : 'border-white/[0.08] bg-[#071217] text-slate-400 hover:border-[#00e6b8]/30 hover:text-[#00e6b8]'
              }`}
              aria-label="Notifications"
              aria-expanded={showNotifications}
            >
              <Bell className="h-[18px] w-[18px]" />

              {(pendingTasks > 0 || highPriorityTasks > 0) && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e6b8] opacity-40" />
                  <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#03090d] bg-[#00e6b8]" />
                </span>
              )}
            </button>

            {/* Notification backdrop and popover */}
            {showNotifications && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-40 cursor-default"
                  aria-label="Close notifications"
                  onClick={() => setShowNotifications(false)}
                />

                <div className="absolute right-0 z-50 mt-3 w-[min(340px,calc(100vw-32px))] animate-slide-up overflow-hidden rounded-2xl border border-[#00e6b8]/15 bg-[#071217] p-4 shadow-[0_15px_60px_rgba(0,0,0,0.55)]">
                  {/* Popover heading */}
                  <div className="mb-4 flex items-center justify-between border-b border-white/[0.07] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#00e6b8]/20 bg-[#00e6b8]/[0.07]">
                        <Sparkles className="h-4 w-4 text-[#00e6b8]" />
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-white">
                          Activity & Alerts
                        </h3>
                        <p className="mt-0.5 text-[10px] text-slate-500">
                          Your workspace overview
                        </p>
                      </div>
                    </div>

                    <span className="flex items-center gap-1.5 rounded-full border border-[#00e6b8]/15 bg-[#00e6b8]/[0.05] px-2 py-1 text-[9px] font-semibold text-[#00e6b8]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00e6b8]" />
                      Active
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Pending tasks */}
                    <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-[#03090d]/80 p-3 transition-colors hover:border-amber-400/20">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-400/15 bg-amber-400/[0.07]">
                        <Clock className="h-4 w-4 text-amber-400" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-200">
                          {pendingTasks} Tasks Pending
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                          Review your outstanding tasks and keep your
                          workflow moving.
                        </p>
                      </div>
                    </div>

                    {/* High-priority tasks */}
                    <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-[#03090d]/80 p-3 transition-colors hover:border-rose-400/20">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-rose-400/15 bg-rose-400/[0.07]">
                        <Flame className="h-4 w-4 text-rose-400" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-200">
                          {highPriorityTasks} High Priority Tasks
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-slate-500">
                          Check important tasks that may need your
                          attention first.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-center text-[10px] text-slate-600">
                    Task counts are based on your current task statistics.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Vertical divider */}
          <div className="hidden h-8 w-px bg-white/[0.08] sm:block" />

          {/* User avatar and identity */}
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#00e6b8]/30 bg-[#071217] text-sm font-extrabold text-[#42ffd4] shadow-[0_0_20px_rgba(0,230,184,0.05)] transition-all duration-300 hover:border-[#00e6b8]/60 hover:shadow-[0_0_20px_rgba(0,230,184,0.12)]">
                {initials}
              </div>

              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#03090d] bg-[#00e6b8]" />
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="max-w-[125px] truncate text-xs font-bold leading-4 text-slate-200">
                {user?.name || 'Developer'}
              </p>

              <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] leading-none text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00e6b8]" />
                Authenticated
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};