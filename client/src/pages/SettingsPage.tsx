import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { Header } from '../components/dashboard/Header.js';
import { Sidebar } from '../components/dashboard/Sidebar.js';
import {
  User,
  Shield,
  Palette,
  Database,
  CheckCircle2,
  Key,
  Layers,
  Sparkles,
  ArrowLeft,
  Server,
  Lock,
  Clock,
  Save,
  Cpu,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // UI feedback only. Connect this to your profile update API
    // if you want name changes to persist in the database.
    setSavedSuccess(true);
    window.setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#03090d] text-slate-100 selection:bg-[#00e6b8] selection:text-[#03090d]">
      {/* Ambient neon background — matching Dashboard */}
      <div className="pointer-events-none fixed -left-40 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-[#00e6b8]/[0.07] blur-[150px]" />

      <div className="pointer-events-none fixed -right-40 top-[35%] -z-10 h-[500px] w-[500px] rounded-full bg-[#00cfa6]/[0.06] blur-[170px]" />

      <div className="pointer-events-none fixed bottom-0 left-[35%] -z-10 h-[350px] w-[350px] rounded-full bg-emerald-500/[0.04] blur-[140px]" />

      {/* Subtle grid — matching Dashboard */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,230,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,230,184,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Header */}
      <Header
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main layout */}
      <div className="mx-auto flex w-full max-w-[1600px] flex-1">
        {/* Sidebar */}
        <Sidebar
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Settings content */}
        <main className="min-w-0 flex-1 space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Page heading */}
          <div className="flex items-start justify-between gap-4 border-b border-[#00e6b8]/10 pb-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Settings & Preferences
                </h1>

                <Sparkles className="h-4 w-4 text-[#00e6b8]" />
              </div>

              <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400 sm:text-sm">
                Manage your profile, review security information, and explore
                your Taskora workspace configuration.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="hidden shrink-0 items-center gap-2 rounded-xl border border-[#00e6b8]/15 bg-[#071217]/80 px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition-all hover:border-[#00e6b8]/40 hover:bg-[#00e6b8]/[0.06] hover:text-[#42ffd4] sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Tasks</span>
            </Link>
          </div>

          {/* Save success notification */}
          {savedSuccess && (
            <div
              role="status"
              className="flex items-center gap-3 rounded-2xl border border-[#00e6b8]/25 bg-[#00e6b8]/[0.07] p-4 text-sm font-medium text-[#42ffd4]"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00e6b8]" />
              <span>
                Form submitted. Profile changes are not saved to the database
                yet.
              </span>
            </div>
          )}

          {/* Settings grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main settings column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Profile information */}
              <section className="space-y-5 rounded-3xl border border-[#00e6b8]/15 bg-[#071217]/80 p-5 shadow-[0_0_30px_rgba(0,230,184,0.03)] backdrop-blur-xl transition-colors duration-300 hover:border-[#00e6b8]/25 sm:p-6">
                <div className="flex items-center gap-3 border-b border-[#00e6b8]/10 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00e6b8]/20 bg-[#00e6b8]/[0.08]">
                    <User className="h-5 w-5 text-[#00e6b8]" />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-white">
                      Profile Information
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Review your account details.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-5">
                  {/* Full name */}
                  <div>
                    <label
                      htmlFor="settings-name"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Full Name
                    </label>

                    <input
                      id="settings-name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-[#00e6b8]/15 bg-[#03090d] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-[#00e6b8]/50 focus:ring-2 focus:ring-[#00e6b8]/10"
                    />
                  </div>

                  {/* Email address */}
                  <div>
                    <label
                      htmlFor="settings-email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                    >
                      Email Address
                    </label>

                    <input
                      id="settings-email"
                      type="email"
                      autoComplete="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 font-mono text-sm text-slate-500 outline-none"
                    />

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Your registered email address cannot be changed here.
                    </p>
                  </div>

                  {/* Save button */}
                  <div className="flex flex-wrap items-center gap-3 border-t border-[#00e6b8]/10 pt-5">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#00e6b8] px-5 py-3 text-sm font-bold text-[#03090d] transition-all duration-300 hover:bg-[#42ffd4] hover:shadow-[0_0_25px_rgba(0,230,184,0.18)] active:scale-[0.98]"
                    >
                      <Save className="h-4 w-4" />
                      Save Profile Changes
                    </button>

                    <span className="text-xs text-slate-500">
                      Keep your account information up to date.
                    </span>
                  </div>
                </form>
              </section>

              {/* Security information */}
              <section className="space-y-5 rounded-3xl border border-[#00e6b8]/15 bg-[#071217]/80 p-5 shadow-[0_0_30px_rgba(0,230,184,0.03)] backdrop-blur-xl transition-colors duration-300 hover:border-[#00e6b8]/25 sm:p-6">
                <div className="flex items-center gap-3 border-b border-[#00e6b8]/10 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00e6b8]/20 bg-[#00e6b8]/[0.08]">
                    <Shield className="h-5 w-5 text-[#00e6b8]" />
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-white">
                      Security & Session
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Authentication details for your workspace.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Authentication */}
                  <div className="rounded-2xl border border-[#00e6b8]/10 bg-[#03090d]/80 p-4 transition-colors hover:border-[#00e6b8]/25">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Key className="h-4 w-4 text-[#00e6b8]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Authentication
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-200">
                      JWT Authentication
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Token-based account access.
                    </p>
                  </div>

                  {/* Password security */}
                  <div className="rounded-2xl border border-[#00e6b8]/10 bg-[#03090d]/80 p-4 transition-colors hover:border-[#00e6b8]/25">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Lock className="h-4 w-4 text-[#00e6b8]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Password Security
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-200">
                      Password Hashing
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Password protection is handled by the backend.
                    </p>
                  </div>

                  {/* Session configuration */}
                  <div className="rounded-2xl border border-[#00e6b8]/10 bg-[#03090d]/80 p-4 transition-colors hover:border-[#00e6b8]/25 sm:col-span-2">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="h-4 w-4 text-[#00e6b8]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        Session Configuration
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-200">
                      Token expiration is configured by the backend.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      The actual expiration duration depends on your server
                      configuration.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right settings column */}
            <aside className="space-y-6">
              {/* Theme card */}
              <section className="space-y-4 rounded-3xl border border-[#00e6b8]/20 bg-gradient-to-b from-[#00e6b8]/[0.07] via-[#071217]/95 to-[#071217]/95 p-5 shadow-[0_0_30px_rgba(0,230,184,0.04)] backdrop-blur-xl sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00e6b8]/20 bg-[#00e6b8]/10">
                    <Palette className="h-5 w-5 text-[#00e6b8]" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Active Theme
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Taskora visual identity
                    </p>
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl border border-[#00e6b8]/10 bg-[#03090d]/80 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-white">
                      Neon Mint
                    </span>

                    <span className="flex items-center gap-2 text-[10px] font-semibold text-[#42ffd4]">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-[#00e6b8]" />
                      ACTIVE
                    </span>
                  </div>

                  {/* Theme color preview */}
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 rounded-lg border border-white/10 bg-[#03090d]" />
                    <div className="h-9 flex-1 rounded-lg border border-white/10 bg-[#071217]" />
                    <div className="h-9 flex-1 rounded-lg border border-[#00e6b8]/30 bg-[#00e6b8]" />
                    <div className="h-9 flex-1 rounded-lg border border-white/10 bg-[#42ffd4]" />
                  </div>

                  <p className="text-xs leading-6 text-slate-400">
                    A dark workspace with glowing mint accents, subtle
                    borders, and a clean futuristic interface.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-[#00e6b8]/10 bg-[#00e6b8]/[0.04] p-3">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#00e6b8]" />
                  <p className="text-xs leading-5 text-slate-400">
                    Designed for a focused and distraction-free workspace.
                  </p>
                </div>
              </section>

              {/* Technology stack */}
              <section className="space-y-4 rounded-3xl border border-[#00e6b8]/15 bg-[#071217]/80 p-5 shadow-[0_0_30px_rgba(0,230,184,0.03)] backdrop-blur-xl transition-colors duration-300 hover:border-[#00e6b8]/25 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00e6b8]/20 bg-[#00e6b8]/[0.08]">
                    <Database className="h-5 w-5 text-[#00e6b8]" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-white">
                      Technology Stack
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Application components
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Database */}
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#00e6b8]/10 bg-[#03090d]/80 p-3 transition-colors hover:border-[#00e6b8]/25">
                    <div className="flex items-center gap-2.5">
                      <Database className="h-4 w-4 text-[#00e6b8]" />
                      <span className="text-xs text-slate-400">Database</span>
                    </div>

                    <span className="text-xs font-semibold text-slate-200">
                      PostgreSQL
                    </span>
                  </div>

                  {/* ORM */}
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#00e6b8]/10 bg-[#03090d]/80 p-3 transition-colors hover:border-[#00e6b8]/25">
                    <div className="flex items-center gap-2.5">
                      <Layers className="h-4 w-4 text-[#00e6b8]" />
                      <span className="text-xs text-slate-400">ORM Layer</span>
                    </div>

                    <span className="text-xs font-semibold text-slate-200">
                      Prisma
                    </span>
                  </div>

                  {/* Backend */}
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#00e6b8]/10 bg-[#03090d]/80 p-3 transition-colors hover:border-[#00e6b8]/25">
                    <div className="flex items-center gap-2.5">
                      <Server className="h-4 w-4 text-[#00e6b8]" />
                      <span className="text-xs text-slate-400">Backend</span>
                    </div>

                    <span className="text-xs font-semibold text-slate-200">
                      Node.js
                    </span>
                  </div>

                  {/* Frontend */}
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#00e6b8]/10 bg-[#03090d]/80 p-3 transition-colors hover:border-[#00e6b8]/25">
                    <div className="flex items-center gap-2.5">
                      <Cpu className="h-4 w-4 text-[#00e6b8]" />
                      <span className="text-xs text-slate-400">Frontend</span>
                    </div>

                    <span className="text-xs font-semibold text-slate-200">
                      React + TS
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#00e6b8]/10 pt-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00e6b8]" />
                    <p className="text-xs leading-5 text-slate-400">
                      These are the configured technology labels. They do not
                      represent a live database or API health check.
                    </p>
                  </div>
                </div>
              </section>

              {/* Mobile dashboard link */}
              <Link
                to="/dashboard"
                className="group flex items-center justify-between rounded-2xl border border-[#00e6b8]/15 bg-[#071217]/80 p-4 transition-all hover:border-[#00e6b8]/30 hover:bg-[#00e6b8]/[0.07] sm:hidden"
              >
                <span className="text-sm font-semibold text-slate-200">
                  Back to Dashboard
                </span>

                <ArrowLeft className="h-4 w-4 text-[#00e6b8] transition-transform group-hover:-translate-x-1" />
              </Link>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};