import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { useTasks } from '../../context/TaskContext.js';
import {
  LayoutDashboard,
  CheckCircle2,
  ListTodo,
  Settings,
  LogOut,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { logout, user } = useAuth();
  const {
    stats,
    setStatusFilter,
    setPriorityFilter,
    statusFilter,
  } = useTasks();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onCloseMobile?.();
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      count: stats?.totalTasks ?? 0,
      active:
        location.pathname === '/dashboard' &&
        statusFilter === 'ALL',
      onClick: () => {
        setStatusFilter('ALL');
        setPriorityFilter('ALL');

        if (location.pathname !== '/dashboard') {
          navigate('/dashboard');
        }

        onCloseMobile?.();
      },
    },
    {
      id: 'my-tasks',
      label: 'My Tasks',
      icon: ListTodo,
      count: stats?.pendingTasks ?? 0,
      active:
        location.pathname === '/dashboard' &&
        (statusFilter === 'TODO' ||
          statusFilter === 'IN_PROGRESS'),
      onClick: () => {
        setStatusFilter('IN_PROGRESS');
        setPriorityFilter('ALL');

        if (location.pathname !== '/dashboard') {
          navigate('/dashboard');
        }

        onCloseMobile?.();
      },
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCircle2,
      count: stats?.completedTasks ?? 0,
      active:
        location.pathname === '/dashboard' &&
        statusFilter === 'COMPLETED',
      onClick: () => {
        setStatusFilter('COMPLETED');
        setPriorityFilter('ALL');

        if (location.pathname !== '/dashboard') {
          navigate('/dashboard');
        }

        onCloseMobile?.();
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      active: location.pathname === '/settings',
      onClick: () => {
        navigate('/settings');
        onCloseMobile?.();
      },
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 cursor-default bg-black/70 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[270px] shrink-0 flex-col justify-between border-r border-white/[0.08] bg-[#05080f] p-5 transition-transform duration-300 md:sticky md:top-0 md:z-30 md:h-screen md:translate-x-0 ${
          isOpenMobile
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        <div className="space-y-9">
          {/* Brand */}
          <div className="flex items-center justify-between gap-3 px-1 pt-1">
            <Link
              to="/dashboard"
              onClick={onCloseMobile}
              className="group flex min-w-0 items-center gap-3"
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#00e6b8]/30 bg-[#071217] shadow-[0_0_20px_rgba(0,230,184,0.05)] transition-all duration-300 group-hover:border-[#00e6b8]/60 group-hover:shadow-[0_0_25px_rgba(0,230,184,0.12)]">
                <Layers className="h-6 w-6 text-[#00e6b8] transition-transform duration-300 group-hover:scale-110" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-white">
                    Taskora
                  </span>

                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#00e6b8]" />
                </div>

                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Neon Workspace
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-500 transition-colors hover:border-[#00e6b8]/20 hover:text-[#00e6b8] md:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation */}
          <div>
            <div className="mb-3 px-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
              Workspace
            </div>

            <nav className="space-y-2" aria-label="Main navigation">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.onClick}
                    aria-current={item.active ? 'page' : undefined}
                    className={`group relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl border px-3.5 py-3 text-left text-xs font-semibold transition-all duration-300 ${
                      item.active
                        ? 'border-[#00e6b8]/30 bg-gradient-to-r from-[#00e6b8]/[0.10] to-[#00e6b8]/[0.025] text-white shadow-[0_0_20px_rgba(0,230,184,0.035)]'
                        : 'border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.025] hover:text-slate-200'
                    }`}
                  >
                    {/* Active indicator */}
                    {item.active && (
                      <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[#00e6b8] shadow-[0_0_10px_rgba(0,230,184,0.55)]" />
                    )}

                    <span className="flex min-w-0 items-center gap-3">
                      <Icon
                        className={`h-[18px] w-[18px] shrink-0 transition-colors duration-300 ${
                          item.active
                            ? 'text-[#00e6b8]'
                            : 'text-slate-500 group-hover:text-[#00e6b8]'
                        }`}
                      />

                      <span className="truncate">
                        {item.label}
                      </span>
                    </span>

                    {typeof item.count === 'number' && (
                      <span
                        className={`min-w-[25px] rounded-lg px-2 py-1 text-center font-mono text-[10px] transition-colors ${
                          item.active
                            ? 'border border-[#00e6b8]/20 bg-[#00e6b8]/10 text-[#42ffd4]'
                            : 'border border-transparent bg-white/[0.035] text-slate-500 group-hover:text-slate-300'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Workspace status card */}
          <div className="rounded-2xl border border-[#00e6b8]/10 bg-gradient-to-br from-[#00e6b8]/[0.05] to-transparent p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00e6b8]" />

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Workspace Status
              </span>
            </div>

            <p className="text-sm font-bold text-white">
              Keep moving forward
            </p>

            <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
              Organize your tasks and make progress one step at a time.
            </p>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#00e6b8]/60 to-[#00e6b8]/20" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="space-y-4 border-t border-white/[0.07] pt-4">
          {/* User details */}
          <div className="flex min-w-0 items-center gap-3 px-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00e6b8]/20 bg-[#071217] text-sm font-extrabold text-[#42ffd4]">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : 'U'}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-200">
                {user?.name || 'Developer'}
              </p>

              <p className="mt-1 truncate text-[10px] text-slate-500">
                Taskora Workspace
              </p>
            </div>

            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#00e6b8]"
              title="Signed in"
            />
          </div>

          {/* Sign out */}
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3.5 py-3 text-xs font-semibold text-slate-400 transition-all duration-300 hover:border-red-400/15 hover:bg-red-400/[0.05] hover:text-red-300"
          >
            <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />

            <span>Sign Out</span>
          </button>

          {/* Version */}
          <p className="px-1 text-[10px] text-slate-600">
            Taskora · Your productivity workspace
          </p>
        </div>
      </aside>
    </>
  );
};