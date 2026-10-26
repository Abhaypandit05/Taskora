import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Home, ArrowLeft, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Background Aurora Orbs */}
      <div className="fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/15 blur-[160px] pointer-events-none -z-10 animate-float-slow" />
      <div className="fixed -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[160px] pointer-events-none -z-10 animate-float-delayed" />

      <div className="relative z-10 text-center max-w-md space-y-6 animate-slide-up">
        {/* Logo */}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-aurora-glow mx-auto">
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#080c16]">
            <Layers className="h-8 w-8 text-cyan-300" />
          </div>
        </div>

        <div>
          <span className="text-8xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent font-mono">
            404
          </span>
          <div className="flex items-center justify-center gap-2 mt-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Signal Lost</h1>
            <Sparkles className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            The milestone, route, or telemetry coordinates you requested do not exist in the TaskFlow system.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow-aurora-glow hover:brightness-110 active:scale-95 transition-all"
          >
            <Home className="h-4 w-4" />
            <span>Go to Dashboard</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-surface-100/80 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-surface-200 hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Landing Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
