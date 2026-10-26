import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Database,
  BarChart3,
  CheckCircle2,
  Cpu,
  Clock,
  ChevronRight,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    try {
      await login('alex@taskflow.dev', 'password123');
      navigate('/dashboard');
    } catch {
      navigate('/login');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#03090d] text-slate-100 selection:bg-[#00e6b8] selection:text-[#03090d]">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed -left-40 -top-40 -z-10 h-[550px] w-[550px] rounded-full bg-[#00e6b8]/10 blur-[160px] animate-float-slow" />

      <div className="pointer-events-none fixed right-[-10%] top-[25%] -z-10 h-[500px] w-[500px] rounded-full bg-[#00cfa6]/10 blur-[170px] animate-float-delayed" />

      <div className="pointer-events-none fixed bottom-[-10%] left-[25%] -z-10 h-[600px] w-[600px] rounded-full bg-[#087f70]/10 blur-[180px]" />

      {/* Subtle grid background */}
      <div className="pointer-events-none fixed inset-0 -z-10 cyber-grid opacity-20" />

      {/* Navigation */}
      <nav className="sticky top-0 z-30 border-b border-[#00e6b8]/10 bg-[#03090d]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00e6b8]/25 bg-[#00e6b8]/10 shadow-[0_0_22px_rgba(0,230,184,0.08)] transition-all duration-300 group-hover:border-[#00e6b8]/50 group-hover:shadow-[0_0_25px_rgba(0,230,184,0.18)]">
              <Layers className="h-5 w-5 text-[#00e6b8]" />
            </div>

            <div>
              <span className="block text-lg font-extrabold tracking-tight text-white">
                Task<span className="text-[#00e6b8]">ora</span>
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Work smarter
              </span>
            </div>
          </Link>

          {/* Navigation actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="neon-button-cyan flex items-center gap-2 rounded-xl bg-[#00e6b8] px-3.5 py-2.5 text-xs font-bold text-[#03110e] transition-all hover:shadow-[0_0_25px_rgba(0,230,184,0.2)] sm:px-5"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:text-[#42ffd4] sm:px-4"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded-xl border border-[#00e6b8]/30 bg-[#00e6b8]/10 px-3.5 py-2.5 text-xs font-bold text-[#42ffd4] transition-all hover:border-[#00e6b8]/60 hover:bg-[#00e6b8]/15 sm:px-5 sm:text-sm"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <main className="flex-1">
        <section className="mx-auto flex max-w-7xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
          {/* Announcement badge */}
          <div className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-[#00e6b8]/20 bg-[#00e6b8]/[0.06] px-4 py-2 text-[10px] font-semibold text-[#42ffd4] sm:text-xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e6b8] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00e6b8]" />
            </span>

            <span>YOUR WORKSPACE. YOUR FLOW.</span>

            <Sparkles className="h-3.5 w-3.5 shrink-0" />
          </div>

          {/* Main heading */}
          <h1 className="max-w-5xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Turn your plans into
            <br className="hidden sm:block" />{' '}
            <span className="bg-gradient-to-r from-[#42ffd4] via-[#00e6b8] to-[#80ffe5] bg-clip-text text-transparent">
              meaningful progress.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8 lg:text-lg">
            Organize tasks, manage priorities, and keep your projects moving
            forward. Taskora brings your work together in one simple,
            intuitive workspace.
          </p>

          {/* Call-to-action buttons */}
          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              to="/register"
              className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#00e6b8] px-7 py-3.5 text-sm font-bold text-[#03110e] shadow-[0_0_25px_rgba(0,230,184,0.12)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,230,184,0.25)] active:scale-[0.98] sm:w-auto"
            >
              Create Your Workspace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-[#00e6b8]/30 hover:bg-[#00e6b8]/[0.05] sm:w-auto"
            >
              <Zap className="h-4 w-4 text-[#00e6b8]" />
              Try Demo Account
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#00e6b8]" />
              Easy task management
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />

            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#00e6b8]" />
              Secure authentication
            </span>
          </div>

          {/* Dashboard preview */}
          <div className="relative mt-16 w-full max-w-5xl sm:mt-20">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-x-[15%] top-10 -z-10 h-48 rounded-full bg-[#00e6b8]/10 blur-[100px]" />

            <div className="futuristic-panel relative overflow-hidden rounded-2xl border border-[#00e6b8]/15 bg-[#071116]/95 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:p-7">
              {/* Top accent */}
              <div className="absolute left-[15%] right-[15%] top-0 h-px bg-gradient-to-r from-transparent via-[#00e6b8]/70 to-transparent" />

              {/* Preview header */}
              <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#00e6b8]/80" />
                  </div>

                  <div className="ml-2 min-w-0">
                    <p className="truncate text-left text-xs font-semibold text-slate-300">
                      Taskora Workspace
                    </p>
                    <p className="text-left text-[10px] text-slate-500">
                      Your productivity overview
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start rounded-full border border-[#00e6b8]/15 bg-[#00e6b8]/[0.06] px-3 py-1.5 sm:self-auto">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00e6b8]" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#42ffd4]">
                    Workspace Preview
                  </span>
                </div>
              </div>

              {/* Overview cards */}
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {/* Total tasks */}
                <div className="futuristic-card rounded-2xl border border-white/[0.07] bg-[#09151a] p-4 text-left transition-colors hover:border-[#00e6b8]/20 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Total Tasks</span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#00e6b8]/15 bg-[#00e6b8]/[0.08]">
                      <Layers className="h-4 w-4 text-[#00e6b8]" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <span className="text-3xl font-bold text-white">24</span>
                    <span className="text-[10px] text-slate-500">
                      Across your projects
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[75%] rounded-full bg-[#00e6b8]" />
                  </div>
                </div>

                {/* In progress */}
                <div className="futuristic-card rounded-2xl border border-white/[0.07] bg-[#09151a] p-4 text-left transition-colors hover:border-amber-400/20 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">In Progress</span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/15 bg-amber-400/[0.08]">
                      <Clock className="h-4 w-4 text-amber-300" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <span className="text-3xl font-bold text-white">08</span>
                    <span className="text-[10px] text-slate-500">
                      Currently active
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[45%] rounded-full bg-amber-300" />
                  </div>
                </div>

                {/* Completed */}
                <div className="futuristic-card rounded-2xl border border-white/[0.07] bg-[#09151a] p-4 text-left transition-colors hover:border-emerald-400/20 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Completed</span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08]">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <span className="text-3xl font-bold text-white">16</span>
                    <span className="text-[10px] text-slate-500">
                      Progress made
                    </span>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[80%] rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Task list preview */}
              <div className="rounded-2xl border border-white/[0.07] bg-[#061015] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Priority Tasks
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Keep your next steps organized.
                    </p>
                  </div>

                  <span className="rounded-lg border border-[#00e6b8]/15 bg-[#00e6b8]/[0.06] px-2.5 py-1.5 text-[10px] font-semibold text-[#42ffd4]">
                    This Week
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Task 1 */}
                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 transition-colors hover:border-[#00e6b8]/15">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-400/10">
                      <Cpu className="h-4 w-4 text-rose-300" />
                    </div>

                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-xs font-semibold text-slate-200">
                        Finalize project architecture
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        Development · High priority
                      </p>
                    </div>

                    <span className="shrink-0 rounded-md border border-amber-400/15 bg-amber-400/[0.07] px-2 py-1 text-[9px] font-semibold text-amber-300">
                      IN PROGRESS
                    </span>
                  </div>

                  {/* Task 2 */}
                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 transition-colors hover:border-[#00e6b8]/15">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00e6b8]/10">
                      <Shield className="h-4 w-4 text-[#00e6b8]" />
                    </div>

                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-xs font-semibold text-slate-200">
                        Review authentication flow
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        Security · Medium priority
                      </p>
                    </div>

                    <span className="shrink-0 rounded-md border border-[#00e6b8]/15 bg-[#00e6b8]/[0.06] px-2 py-1 text-[9px] font-semibold text-[#42ffd4]">
                      COMPLETED
                    </span>
                  </div>

                  {/* Task 3 */}
                  <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 transition-colors hover:border-[#00e6b8]/15">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-400/10">
                      <Database className="h-4 w-4 text-sky-300" />
                    </div>

                    <div className="min-w-0 flex-1 text-left">
                      <p className="truncate text-xs font-semibold text-slate-200">
                        Configure database connection
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        Backend · High priority
                      </p>
                    </div>

                    <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[9px] font-semibold text-slate-400">
                      TO DO
                    </span>
                  </div>
                </div>
              </div>

              {/* Preview footer */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Sparkles className="h-3.5 w-3.5 text-[#00e6b8]" />
                  A clearer view of your work
                </div>

                <Link
                  to={user ? '/dashboard' : '/register'}
                  className="group flex items-center gap-1 text-xs font-semibold text-[#42ffd4] transition-colors hover:text-white"
                >
                  Explore Taskora
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid w-full grid-cols-1 gap-5 text-left md:grid-cols-3 md:gap-6">
            {/* Feature 1 */}
            <div className="futuristic-card group rounded-2xl border border-white/[0.07] bg-[#071116]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#00e6b8]/25 hover:shadow-[0_15px_45px_rgba(0,230,184,0.05)] sm:rounded-3xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00e6b8]/20 bg-[#00e6b8]/[0.08] transition-colors group-hover:bg-[#00e6b8]/15">
                <BarChart3 className="h-5 w-5 text-[#00e6b8]" />
              </div>

              <h3 className="text-base font-bold text-white">
                Track Your Progress
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Keep an eye on your workload, task status, and completed work
                with a clear overview of your progress.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#42ffd4]">
                <CheckCircle2 className="h-4 w-4" />
                Stay organized
              </div>
            </div>

            {/* Feature 2 */}
            <div className="futuristic-card group rounded-2xl border border-white/[0.07] bg-[#071116]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#00e6b8]/25 hover:shadow-[0_15px_45px_rgba(0,230,184,0.05)] sm:rounded-3xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00e6b8]/20 bg-[#00e6b8]/[0.08] transition-colors group-hover:bg-[#00e6b8]/15">
                <Shield className="h-5 w-5 text-[#00e6b8]" />
              </div>

              <h3 className="text-base font-bold text-white">
                Your Own Workspace
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Sign in to your account and manage your tasks in a workspace
                designed around your workflow.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#42ffd4]">
                <CheckCircle2 className="h-4 w-4" />
                Account-based access
              </div>
            </div>

            {/* Feature 3 */}
            <div className="futuristic-card group rounded-2xl border border-white/[0.07] bg-[#071116]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#00e6b8]/25 hover:shadow-[0_15px_45px_rgba(0,230,184,0.05)] sm:rounded-3xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00e6b8]/20 bg-[#00e6b8]/[0.08] transition-colors group-hover:bg-[#00e6b8]/15">
                <Database className="h-5 w-5 text-[#00e6b8]" />
              </div>

              <h3 className="text-base font-bold text-white">
                Full-Stack Foundation
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Built around a modern web stack with React, TypeScript,
                Express, and Prisma-powered database integration.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#42ffd4]">
                <CheckCircle2 className="h-4 w-4" />
                Modern technology
              </div>
            </div>
          </div>

          {/* Final call to action */}
          <div className="relative mt-16 overflow-hidden rounded-3xl border border-[#00e6b8]/15 bg-gradient-to-br from-[#00e6b8]/[0.08] via-[#071116] to-[#071116] p-7 sm:mt-20 sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#00e6b8]/10 blur-[90px]" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00e6b8]/20 bg-[#00e6b8]/10">
                <Zap className="h-5 w-5 text-[#00e6b8]" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Make room for better work.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Start organizing your tasks and turn your next idea into
                actionable steps.
              </p>

              <Link
                to={user ? '/dashboard' : '/register'}
                className="mt-6 flex items-center gap-2 rounded-xl bg-[#00e6b8] px-6 py-3 text-sm font-bold text-[#03110e] transition-all hover:shadow-[0_0_30px_rgba(0,230,184,0.2)]"
              >
                {user ? 'Go to Dashboard' : 'Get Started for Free'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#00e6b8]/10 bg-[#03090d]/90">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-7 sm:flex-row sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#00e6b8]/20 bg-[#00e6b8]/[0.08]">
              <Layers className="h-4 w-4 text-[#00e6b8]" />
            </div>

            <div>
              <span className="block text-sm font-bold text-white">
                Task<span className="text-[#00e6b8]">ora</span>
              </span>
              <span className="block text-[9px] text-slate-500">
                Organize. Prioritize. Progress.
              </span>
            </div>
          </Link>

          <p className="text-center text-xs text-slate-500">
            Built to make everyday work more organized.
          </p>

          <div className="flex items-center gap-5 text-xs text-slate-400">
            <Link
              to="/login"
              className="transition-colors hover:text-[#42ffd4]"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="transition-colors hover:text-[#42ffd4]"
            >
              Register
            </Link>

            <Link
              to="/dashboard"
              className="transition-colors hover:text-[#42ffd4]"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};