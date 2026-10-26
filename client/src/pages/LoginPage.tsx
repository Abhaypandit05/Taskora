import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import {
  Layers,
  Lock,
  ArrowRight,
  AlertCircle,
  Zap,
  Sparkles,
  User,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier.trim() || !password) {
      setError('Please provide both your email/name and password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login(identifier.trim(), password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          'Invalid login credentials. Please verify your details.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setError(null);
    setIsLoading(true);

    try {
      await login(demoEmail, 'password123');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#03090d] p-4 text-white selection:bg-teal-400/30 selection:text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed -left-40 -top-40 -z-0 h-[500px] w-[500px] animate-float-slow rounded-full bg-emerald-400/10 blur-[160px]" />

      <div className="pointer-events-none fixed -bottom-40 -right-40 -z-0 h-[500px] w-[500px] animate-float-delayed rounded-full bg-teal-400/10 blur-[160px]" />

      <div className="cyber-grid pointer-events-none fixed inset-0 -z-0 opacity-50" />

      {/* Login card */}
      <div className="futuristic-panel relative z-10 w-full max-w-md animate-slide-up overflow-hidden rounded-3xl p-7 backdrop-blur-2xl sm:p-8">
        {/* Mint accent line */}
        <div className="absolute left-12 right-12 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#42ffd4] to-transparent" />

        {/* Brand */}
        <div className="mb-7 flex flex-col items-center text-center">
          <Link
            to="/"
            aria-label="Go to Taskora home"
            className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#42ffd4]/30 bg-gradient-to-br from-[#00e6b8]/20 to-[#00cfa6]/5 shadow-[0_0_30px_rgba(0,230,184,0.12)] transition-all duration-300 hover:scale-105 hover:border-[#42ffd4]/60"
          >
            <Layers className="h-7 w-7 text-[#42ffd4]" />
          </Link>

          <div className="mb-1 flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Welcome Back
            </h1>
            <Sparkles className="h-4 w-4 text-[#42ffd4]" />
          </div>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
            Sign in to Taskora and get back to managing your work.
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-3 text-xs leading-5 text-rose-300"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="login-identifier"
              className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-300"
            >
              Email Address or Full Name
            </label>

            <div className="group relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#42ffd4]" />

              <input
                id="login-identifier"
                type="text"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your email or full name"
                className="w-full rounded-xl border border-white/[0.09] bg-[#07141a] py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 transition-all duration-200 focus:border-[#00e6b8]/60 focus:outline-none focus:ring-2 focus:ring-[#00e6b8]/10"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-300"
            >
              Password
            </label>

            <div className="group relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#42ffd4]" />

              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-white/[0.09] bg-[#07141a] py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 transition-all duration-200 focus:border-[#00e6b8]/60 focus:outline-none focus:ring-2 focus:ring-[#00e6b8]/10"
                required
              />
            </div>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            disabled={isLoading}
            className="neon-button-cyan mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        {/* Demo access */}
        <div className="mt-7 border-t border-white/[0.08] pt-5">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            <Zap className="h-4 w-4 text-[#42ffd4]" />
            <span>Instant Demo Access</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleDemoLogin('alex@taskflow.dev')}
              className="rounded-xl border border-white/[0.08] bg-[#07141a]/80 p-3 text-left transition-all duration-200 hover:border-[#00e6b8]/40 hover:bg-[#00e6b8]/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="mb-1 text-xs font-bold text-[#42ffd4]">
                Alex Morgan
              </div>
              <div className="text-[10px] text-slate-500">
                Lead Engineer
              </div>
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleDemoLogin('sarah@taskflow.dev')}
              className="rounded-xl border border-white/[0.08] bg-[#07141a]/80 p-3 text-left transition-all duration-200 hover:border-[#00e6b8]/40 hover:bg-[#00e6b8]/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="mb-1 text-xs font-bold text-[#42ffd4]">
                Sarah Chen
              </div>
              <div className="text-[10px] text-slate-500">
                Full-Stack Developer
              </div>
            </button>
          </div>

          <p className="mt-2 text-[10px] leading-4 text-slate-500">
            Demo access requires the demo accounts to be available in your
            authentication service.
          </p>
        </div>

        {/* Sign-up link */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-bold text-[#42ffd4] transition-colors hover:text-white"
          >
            Create account
          </Link>
        </p>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00e6b8] shadow-[0_0_8px_rgba(0,230,184,0.7)]" />
          <span>Taskora Workspace</span>
        </div>
      </div>
    </div>
  );
};
