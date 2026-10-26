import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }

    if (!normalizedEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (password.length < 6) {
      setError('Your password must contain at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      await register(trimmedName, normalizedEmail, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to create your account. Please try again.';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#03090d] px-4 py-10 text-slate-100 selection:bg-[#00e6b8] selection:text-[#03090d] sm:px-6">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#00e6b8]/[0.07] blur-[150px]" />

      <div className="pointer-events-none fixed -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#00cfa6]/[0.06] blur-[160px]" />

      <div className="pointer-events-none fixed left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.025] blur-[150px]" />

      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,230,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,184,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Register card */}
      <main className="relative z-10 w-full max-w-[520px] animate-slide-up">
        <div className="relative overflow-hidden rounded-[28px] border border-[#00e6b8]/15 bg-[#071217]/90 p-6 shadow-[0_0_70px_rgba(0,230,184,0.045)] backdrop-blur-2xl sm:p-9">
          {/* Top neon line */}
          <div className="absolute left-[12%] right-[12%] top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e6b8] to-transparent" />

          {/* Brand icon */}
          <div className="mb-6 flex justify-center">
            <Link
              to="/"
              aria-label="Taskora home"
              className="group flex h-[64px] w-[64px] items-center justify-center rounded-[20px] border border-[#00e6b8]/25 bg-[#00e6b8]/[0.06] shadow-[0_0_30px_rgba(0,230,184,0.06)] transition-all duration-300 hover:border-[#00e6b8]/50 hover:bg-[#00e6b8]/[0.10]"
            >
              <Layers className="h-8 w-8 text-[#00e6b8] transition-transform duration-300 group-hover:scale-110" />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[34px]">
                Create Account
              </h1>

              <Sparkles className="h-5 w-5 text-[#00e6b8]" />
            </div>

            <p className="text-sm leading-6 text-slate-400">
              Start organizing your work with Taskora.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#00e6b8]/15 bg-[#00e6b8]/[0.04] px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#00e6b8]" />
              <span className="text-[11px] font-medium text-slate-400">
                Your workspace starts here
              </span>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/[0.06] p-3.5 text-sm text-red-300"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full name */}
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Full Name
              </label>

              <div className="group relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#00e6b8]" />

                <input
                  id="register-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                  className="w-full rounded-2xl border border-[#00e6b8]/20 bg-[#03090d]/80 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 hover:border-[#00e6b8]/30 focus:border-[#00e6b8]/60 focus:ring-4 focus:ring-[#00e6b8]/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Email Address
              </label>

              <div className="group relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#00e6b8]" />

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="w-full rounded-2xl border border-[#00e6b8]/20 bg-[#03090d]/80 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 hover:border-[#00e6b8]/30 focus:border-[#00e6b8]/60 focus:ring-4 focus:ring-[#00e6b8]/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Password
              </label>

              <div className="group relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#00e6b8]" />

                <input
                  id="register-password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  minLength={6}
                  required
                  className="w-full rounded-2xl border border-[#00e6b8]/20 bg-[#03090d]/80 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 hover:border-[#00e6b8]/30 focus:border-[#00e6b8]/60 focus:ring-4 focus:ring-[#00e6b8]/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Use at least 6 characters.
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#00e6b8] px-5 py-3.5 text-sm font-extrabold text-[#03090d] shadow-[0_0_25px_rgba(0,230,184,0.08)] transition-all duration-300 hover:bg-[#42ffd4] hover:shadow-[0_0_35px_rgba(0,230,184,0.18)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              Already a member?
            </span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Sign in link */}
          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-[#00e6b8] transition-colors hover:text-[#42ffd4]"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-600">
          Taskora · Organize your work. Focus on what matters.
        </p>
      </main>
    </div>
  );
};