import { useEffect, useState, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Lock, LogOut, Users, BarChart3, FileText, LayoutDashboard,
  Search, X, Eye, Phone, Mail, Building2, MapPin, Calendar,
  MessageCircle, CheckCircle2, Loader2, Trash2, Menu, Bell,
  Settings, ChevronDown, Download, Upload, TrendingUp, Filter,
  User, Shield, ShieldCheck, Activity, Star, AlertCircle, Clock, Plus,
  FileSpreadsheet, RefreshCw, Zap, Target, Award, Edit3,
  ChevronUp, ChevronRight, History, Send,
} from 'lucide-react';
import {
  signIn, signOut, getSession,
  getLeads, updateLead, deleteLead,
} from '../../lib/supabase';

/* ==================== CONSTANTS ==================== */
const STATUSES = [
  { value: 'new', label: 'New', color: '#1683FF' },
  { value: 'contacted', label: 'Contacted', color: '#A855F7' },
  { value: 'qualified', label: 'Qualified', color: '#10B981' },
  { value: 'documents_pending', label: 'Docs Pending', color: '#F59E0B' },
  { value: 'in_process', label: 'In Process', color: '#F97316' },
  { value: 'submitted', label: 'Submitted', color: '#06B6D4' },
  { value: 'approved', label: 'Approved', color: '#22C55E' },
  { value: 'completed', label: 'Completed', color: '#16A34A' },
  { value: 'not_eligible', label: 'Not Eligible', color: '#EF4444' },
  { value: 'closed', label: 'Closed', color: '#6B7280' },
];

const STATUS_BADGE = {
  new: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  contacted: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  qualified: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  documents_pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  in_process: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  submitted: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  approved: 'bg-green-500/15 text-green-400 border-green-500/30',
  completed: 'bg-green-600/15 text-green-500 border-green-600/30',
  not_eligible: 'bg-red-500/15 text-red-400 border-red-500/30',
  closed: 'bg-gray-500/15 text-gray-400 border-gray-500/30',
};

/* ==================== LEAD SCORING ==================== */
function calculateLeadScore(lead) {
  let score = 30;
  if (lead.email) score += 10;
  if (lead.company) score += 10;
  if (lead.city) score += 5;
  if (lead.message && lead.message.length > 20) score += 10;
  if (lead.source === 'referral') score += 15;
  if (lead.source === 'website') score += 5;
  return Math.min(score, 100);
}

function getScoreLevel(score) {
  if (score >= 81) return { label: 'Hot', color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/30' };
  if (score >= 61) return { label: 'Warm', color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/30' };
  if (score >= 31) return { label: 'Cool', color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/30' };
  return { label: 'Cold', color: 'text-gray-400', bg: 'bg-gray-500/15 border-gray-500/30' };
}

/* ==================== LOGIN (ULTRA LUXURY) ==================== */
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { success, error: err } = await signIn(email, password);
    setLoading(false);
    if (success) onLogin();
    else {
      setError(err || 'Invalid credentials');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 overflow-hidden bg-[#03050B]">
      {/* ============ LUXURY AMBIENT BACKGROUND ============ */}
      <div
        className="absolute -top-80 -left-80 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(22,131,255,0.25), rgba(22,131,255,0.05) 40%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'aurora1 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -bottom-80 -right-80 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(204,171,110,0.2), rgba(204,171,110,0.03) 40%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'aurora2 24s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(92,184,255,0.15), transparent 60%)',
          filter: 'blur(80px)',
          animation: 'aurora3 16s ease-in-out infinite',
        }}
      />

      {/* Animated grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="lux-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lux-grid)" />
      </svg>

      {/* Twinkling stars */}
      {[...Array(20)].map((_, i) => {
        const positions = [
          { top: '12%', left: '18%' }, { top: '28%', left: '82%' },
          { top: '42%', left: '12%' }, { top: '68%', left: '88%' },
          { top: '85%', left: '22%' }, { top: '75%', left: '72%' },
          { top: '18%', left: '45%' }, { top: '55%', left: '95%' },
          { top: '35%', left: '5%' }, { top: '92%', left: '55%' },
        ];
        const p = positions[i % positions.length];
        const delay = `${(i * 0.4) % 5}s`;
        const size = i % 3 === 0 ? 2.5 : 1.5;
        const color = i % 4 === 0 ? '#CCAB6E' : '#5CB8FF';
        return (
          <span
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: size,
              height: size,
              background: color,
              boxShadow: `0 0 ${size * 8}px ${color}`,
              animation: `twinkle ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: delay,
            }}
          />
        );
      })}

      {/* ============ LOGIN CARD ============ */}
      <div
        className="relative w-full max-w-[480px]"
        style={{ animation: shake ? 'shake 0.5s ease-in-out' : 'none' }}
      >
        {/* Card glow aura */}
        <div
          className="absolute -inset-1 rounded-[32px] opacity-60 pointer-events-none"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(22,131,255,0.4), rgba(204,171,110,0.3), rgba(92,184,255,0.4), rgba(22,131,255,0.4))',
            filter: 'blur(24px)',
            animation: 'rotateRing 12s linear infinite',
          }}
        />

        {/* Main card */}
        <div
          className="relative rounded-[28px] overflow-hidden"
          style={{
            background:
              'linear-gradient(160deg, rgba(18,24,38,0.92) 0%, rgba(8,12,24,0.96) 50%, rgba(12,16,28,0.98) 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow:
              '0 40px 120px -20px rgba(0,0,0,0.9), 0 0 60px -20px rgba(22,131,255,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
          }}
        >
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, #1683FF 20%, #CCAB6E 50%, #5CB8FF 80%, transparent)',
              backgroundSize: '200% 100%',
              animation: 'shimmerLine 3.5s linear infinite',
            }}
          />

          {/* Corner accent glow — top right */}
          <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(22,131,255,0.3), transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          {/* Corner accent glow — bottom left */}
          <div
            className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(204,171,110,0.25), transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative p-8 sm:p-10">
            {/* ============ LOGO + BRANDING ============ */}
            <div className="flex flex-col items-center mb-8">
              {/* Logo with premium animation */}
              <div className="relative mb-5">
                {/* Rotating conic ring behind logo */}
                <div
                  className="absolute -inset-5 rounded-full pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0%, #1683FF 25%, #CCAB6E 50%, #5CB8FF 75%, transparent 100%)',
                    filter: 'blur(18px)',
                    opacity: 0.5,
                    animation: 'rotateRing 10s linear infinite',
                  }}
                />
                {/* Pulse ring */}
                <div
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{
                    border: '1px solid rgba(22,131,255,0.3)',
                    animation: 'pulseRing 3s ease-out infinite',
                  }}
                />
                {/* Logo container */}
                <div
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(22,131,255,0.08) 0%, rgba(10,15,31,0.6) 50%, rgba(204,171,110,0.06) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 60px -10px rgba(22,131,255,0.5)',
                    animation: 'logoFloat 4s ease-in-out infinite',
                  }}
                >
                  {/* Inner shimmer */}
                  <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmerLine 4s linear infinite',
                    }}
                  />
                  {/* Logo image */}
                  <img
                    src="/certwinx-logo.png"
                    alt="CertWinX"
                    className="relative w-[72%] h-[72%] object-contain"
                    style={{
                      filter:
                        'drop-shadow(0 0 12px rgba(22,131,255,0.6)) drop-shadow(0 0 24px rgba(92,184,255,0.3))',
                    }}
                    draggable={false}
                  />
                </div>
              </div>

              {/* Company name — LUXURY */}
              <h2
                className="font-display text-[15px] sm:text-[17px] font-bold tracking-[0.02em] mb-1"
                style={{
                  background:
                    'linear-gradient(180deg, #FFFFFF 0%, #A8C6E8 60%, #5CB8FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CertWinX Private Limited
              </h2>

              {/* Divider with dot */}
              <div className="flex items-center gap-2 my-3">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#1683FF]/50" />
                <span className="w-1 h-1 rounded-full bg-[#CCAB6E]" />
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#1683FF]/50" />
              </div>

              {/* MASTER ADMIN badge */}
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.28em] uppercase"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(22,131,255,0.12), rgba(204,171,110,0.08))',
                  border: '1px solid rgba(22,131,255,0.25)',
                  color: '#7CBFFF',
                  boxShadow: '0 0 20px -5px rgba(22,131,255,0.4)',
                }}
              >
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#1683FF] animate-ping" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-[#1683FF]" />
                </span>
                Master Admin Access
              </span>

              {/* Welcome heading */}
              <h1
                className="font-display text-[26px] sm:text-[30px] font-bold leading-[1.1] tracking-[-0.02em] mt-5 mb-1"
                style={{
                  background:
                    'linear-gradient(180deg, #FFFFFF 0%, #E0ECFF 60%, #5CB8FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Welcome Back
              </h1>

              <p className="text-[11px] text-white/40 tracking-wide">
                Sign in to continue to your control panel
              </p>
            </div>

            {/* ============ FORM ============ */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[9px] font-bold tracking-[0.22em] text-white/40 uppercase mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-[#1683FF] transition-colors"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@certwinx.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.025] border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#1683FF]/60 focus:bg-white/[0.05] focus:shadow-[0_0_25px_-5px_rgba(22,131,255,0.5)] transition-all"
                    style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2 ml-1">
                  <label className="block text-[9px] font-bold tracking-[0.22em] text-white/40 uppercase">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[10px] text-white/35 hover:text-[#1683FF] transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <Lock
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-[#1683FF] transition-colors"
                  />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/[0.025] border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#1683FF]/60 focus:bg-white/[0.05] focus:shadow-[0_0_25px_-5px_rgba(22,131,255,0.5)] transition-all"
                    style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/25 hover:text-white/70 transition-colors"
                  >
                    <Eye size={15} />
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 accent-[#1683FF] cursor-pointer"
                  />
                  <span className="text-[11px] text-white/50 select-none">
                    Keep me signed in
                  </span>
                </label>

                <div className="flex items-center gap-1.5 text-[10px] text-white/30">
                  <Lock size={9} />
                  <span>SSL Secured</span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="p-3 rounded-xl flex items-start gap-2"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.25)',
                  }}
                >
                  <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                  <p className="text-red-400 text-[11px] leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-4 rounded-xl text-white font-semibold text-sm overflow-hidden group transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{
                  background:
                    'linear-gradient(135deg, #1683FF 0%, #0A5FCC 50%, #084A9E 100%)',
                  boxShadow:
                    '0 20px 50px -15px rgba(22,131,255,0.7), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2)',
                }}
              >
                <span
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    animation: 'buttonShine 1.5s linear infinite',
                  }}
                />
                <span
                  className="absolute top-0 left-0 right-0 h-1/2 rounded-t-xl pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)',
                  }}
                />
                <span className="relative inline-flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield size={16} strokeWidth={2.2} />
                      Sign In to Dashboard
                      <ChevronRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* ============ SECURITY FOOTER ============ */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center justify-center gap-4 text-[9px] font-bold tracking-wider text-white/30 uppercase">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={11} className="text-[#1683FF]/70" />
                  256-bit SSL
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1.5">
                  <Lock size={10} className="text-[#1683FF]/70" />
                  Session Only
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={10} className="text-[#1683FF]/70" />
                  Audit Logged
                </span>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(204,171,110,0.6) 50%, transparent)',
            }}
          />
        </div>
      </div>

      {/* ============ FOOTER BRANDING ============ */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center space-y-1">
        <p
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          CertWinX · Enterprise Edition
        </p>
        <p className="text-[8px] text-white/20 tracking-widest uppercase">
          © {new Date().getFullYear()} · All Rights Reserved
        </p>
      </div>

      {/* ============ ANIMATIONS ============ */}
      <style>{`
        @keyframes shimmerLine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        @keyframes aurora1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(80px, 60px) scale(1.15); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-80px, -60px) scale(1.15); }
        }
        @keyframes aurora3 {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50% { transform: translate(-50%, 40px) scale(0.95); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes rotateRing {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes buttonShine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.02); }
        }
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/* ==================== SIDEBAR ==================== */
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads', icon: Users, badge: 'LIVE' },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'import', label: 'Lead Migration', icon: Upload, badge: 'NEW' },
  { id: 'activity', label: 'Activity Log', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function Sidebar({ open, onClose, onLogout, activeTab, onTabChange, leadCount }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[260px] z-50 bg-[#0A0F1F] border-r border-white/10 transform transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <img
            src="/certwinx-logo.png"
            alt="CertWinX"
            style={{ height: '36px', width: 'auto', filter: 'brightness(0) invert(1)' }}
          />
          <button onClick={onClose} className="lg:hidden p-1.5 text-white/60 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); onClose(); }}
                className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1683FF]/15 to-transparent text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-gradient-to-b from-[#1683FF] to-[#0A5FCC]" />
                )}
                <Icon size={16} className={isActive ? 'text-[#1683FF]' : ''} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.id === 'leads' && leadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-[#1683FF]/15 text-[#1683FF] text-[9px] font-bold">
                    {leadCount}
                  </span>
                )}
                {item.badge && item.id !== 'leads' && (
                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[9px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* ==================== STAT CARD ==================== */
function StatCard({ label, value, icon: Icon, color, trend }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-5 hover:border-white/20 transition-all">
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-20 blur-2xl"
        style={{ background: color }}
      />
      <div className="relative flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border"
          style={{ background: `${color}15`, borderColor: `${color}30`, color }}
        >
          <Icon size={18} />
        </div>
        {trend && (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {trend}
          </span>
        )}
      </div>
      <p className="relative text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">{label}</p>
      <p className="relative font-display text-2xl font-bold text-white tabular-nums">{value}</p>
    </div>
  );
}

/* ==================== DASHBOARD ==================== */
function Dashboard({ leads, onNavigate }) {
  const stats = useMemo(() => {
    const now = new Date();
    const last24h = leads.filter((l) => (now - new Date(l.created_at)) < 24 * 60 * 60 * 1000).length;
    const last7d = leads.filter((l) => (now - new Date(l.created_at)) < 7 * 24 * 60 * 60 * 1000).length;
    const qualified = leads.filter((l) => ['qualified', 'in_process', 'approved', 'completed'].includes(l.status)).length;
    const completed = leads.filter((l) => l.status === 'completed').length;
    const conversion = leads.length > 0 ? Math.round((completed / leads.length) * 100) : 0;

    return { total: leads.length, last24h, last7d, qualified, completed, conversion };
  }, [leads]);

  const bySource = useMemo(() => {
    const acc = {};
    leads.forEach((l) => {
      const key = l.source || 'website';
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, [leads]);

  const byStatus = useMemo(() => {
    const acc = {};
    leads.forEach((l) => {
      acc[l.status] = (acc[l.status] || 0) + 1;
    });
    return acc;
  }, [leads]);

  const recent = useMemo(
    () => [...leads].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6),
    [leads]
  );

  const trendData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      const count = leads.filter((l) => {
        const t = new Date(l.created_at);
        return t >= d && t < next;
      }).length;
      days.push({ day: d.toLocaleDateString('en-IN', { weekday: 'short' }), count });
    }
    return days;
  }, [leads]);

  const maxTrend = Math.max(...trendData.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-sm text-white/50">Real-time overview of your lead pipeline.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={stats.total} icon={Users} color="#1683FF" trend={`+${stats.last24h} today`} />
        <StatCard label="Last 7 Days" value={stats.last7d} icon={TrendingUp} color="#10B981" />
        <StatCard label="Qualified" value={stats.qualified} icon={Target} color="#A855F7" />
        <StatCard label="Conversion" value={`${stats.conversion}%`} icon={Award} color="#F59E0B" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl bg-white/[0.03] border border-white/10 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-white">7-Day Lead Trend</h2>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Last 7 days</span>
          </div>
          <div className="flex items-end gap-2 h-40">
            {trendData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-white/60 tabular-nums">{d.count}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-[#1683FF]/30 to-[#1683FF] transition-all"
                  style={{ height: `${Math.max((d.count / maxTrend) * 100, 4)}%` }}
                />
                <span className="text-[10px] text-white/40 uppercase">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
          <h2 className="font-display font-semibold text-white mb-5">Status Distribution</h2>
          <div className="space-y-2.5">
            {Object.entries(byStatus).length === 0 ? (
              <p className="text-sm text-white/40">No data yet.</p>
            ) : (
              Object.entries(byStatus)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([status, count]) => {
                  const s = STATUSES.find((x) => x.value === status);
                  return (
                    <div key={status} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s?.color || '#6B7280' }} />
                      <span className="text-xs text-white/70 flex-1 truncate">{s?.label || status}</span>
                      <span className="text-xs font-bold text-white tabular-nums">{count}</span>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h2 className="font-display font-semibold text-white">Recent Leads</h2>
            <button onClick={() => onNavigate('leads')} className="text-xs text-[#1683FF] hover:text-[#5CB8FF]">
              View all →
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {recent.length === 0 ? (
              <p className="p-8 text-center text-white/40 text-sm">No leads yet.</p>
            ) : (
              recent.map((lead) => {
                const score = calculateLeadScore(lead);
                return (
                  <div key={lead.id} className="flex items-center gap-3 p-4 hover:bg-white/[0.02]">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1683FF] to-[#0A5FCC] flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {lead.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{lead.name}</p>
                      <p className="text-xs text-white/50 truncate">{lead.mobile}</p>
                    </div>
                    <span className={`text-xs font-bold tabular-nums ${getScoreLevel(score).color}`}>{score}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
          <h2 className="font-display font-semibold text-white mb-4">Leads by Source</h2>
          <div className="space-y-3">
            {Object.entries(bySource).length === 0 ? (
              <p className="text-sm text-white/40">No data yet.</p>
            ) : (
              Object.entries(bySource)
                .sort((a, b) => b[1] - a[1])
                .map(([source, count]) => {
                  const max = Math.max(...Object.values(bySource));
                  const pct = (count / max) * 100;
                  return (
                    <div key={source}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-white/70 capitalize">{source}</span>
                        <span className="text-sm font-bold text-[#1683FF]">{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#1683FF] to-[#0A5FCC]"
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== LEADS LIST ==================== */
function LeadsList({ leads, onRefresh, onImport }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('');

  const sources = useMemo(() => {
    const s = new Set();
    leads.forEach((l) => s.add(l.source || 'website'));
    return Array.from(s);
  }, [leads]);

  const filtered = useMemo(() => {
    let result = leads.filter((l) => {
      if (filterStatus !== 'all' && l.status !== filterStatus) return false;
      if (filterSource !== 'all' && (l.source || 'website') !== filterSource) return false;

      if (dateRange !== 'all') {
        const now = new Date();
        const created = new Date(l.created_at);
        const diff = (now - created) / (1000 * 60 * 60 * 24);
        if (dateRange === 'today' && diff > 1) return false;
        if (dateRange === 'week' && diff > 7) return false;
        if (dateRange === 'month' && diff > 30) return false;
      }

      if (search) {
        const q = search.toLowerCase();
        return (
          l.name?.toLowerCase().includes(q) ||
          l.mobile?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.company?.toLowerCase().includes(q)
        );
      }
      return true;
    });

    if (sortBy === 'newest') result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    else if (sortBy === 'oldest') result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    else if (sortBy === 'score') result.sort((a, b) => calculateLeadScore(b) - calculateLeadScore(a));
    else if (sortBy === 'name') result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    return result;
  }, [leads, search, filterStatus, filterSource, dateRange, sortBy]);

  const toggleAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map((l) => l.id));
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleBulkStatus = async () => {
    if (!bulkStatus || selectedIds.length === 0) return;
    if (!confirm(`Update ${selectedIds.length} leads to "${bulkStatus}"?`)) return;
    for (const id of selectedIds) {
      await updateLead(id, { status: bulkStatus });
    }
    setSelectedIds([]);
    setBulkStatus('');
    onRefresh();
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} leads permanently?`)) return;
    for (const id of selectedIds) {
      await deleteLead(id);
    }
    setSelectedIds([]);
    onRefresh();
  };

  const exportCSV = () => {
    const data = selectedIds.length > 0 ? filtered.filter((l) => selectedIds.includes(l.id)) : filtered;
    const headers = ['Name', 'Mobile', 'Email', 'Company', 'City', 'Source', 'Status', 'Score', 'Date'];
    const rows = data.map((l) => [
      l.name, l.mobile, l.email || '', l.company || '', l.city || '',
      l.source || '', l.status, calculateLeadScore(l),
      new Date(l.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${Date.now()}.csv`;
    a.click();
  };

  const clearFilters = () => {
    setSearch('');
    setFilterStatus('all');
    setFilterSource('all');
    setDateRange('all');
    setSortBy('newest');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Leads</h1>
          <p className="text-sm text-white/50">
            {leads.length} total · {filtered.length} shown
            {selectedIds.length > 0 && <span className="text-[#1683FF]"> · {selectedIds.length} selected</span>}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={onRefresh} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm font-semibold hover:bg-white/[0.08]">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => onImport()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm font-semibold hover:bg-white/[0.08]">
            <Upload size={14} /> Import
          </button>
          <button onClick={exportCSV} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#0A5FCC] text-white text-sm font-semibold hover:shadow-[0_8px_25px_-8px_rgba(22,131,255,0.6)]">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, mobile, email, company..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#1683FF]"
          />
        </div>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
            showFilters ? 'bg-[#1683FF]/10 border-[#1683FF]/30 text-[#1683FF]' : 'bg-white/[0.04] border-white/10 text-white hover:bg-white/[0.08]'
          }`}
        >
          <Filter size={14} /> Filters
          {(filterStatus !== 'all' || filterSource !== 'all' || dateRange !== 'all') && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#1683FF]" />
          )}
        </button>
      </div>

      {showFilters && (
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#1683FF]">
              <option value="all" className="bg-[#0A0F1F]">All Statuses</option>
              {STATUSES.map((s) => <option key={s.value} value={s.value} className="bg-[#0A0F1F]">{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Source</label>
            <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#1683FF]">
              <option value="all" className="bg-[#0A0F1F]">All Sources</option>
              {sources.map((s) => <option key={s} value={s} className="bg-[#0A0F1F] capitalize">{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Date Range</label>
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#1683FF]">
              <option value="all" className="bg-[#0A0F1F]">All Time</option>
              <option value="today" className="bg-[#0A0F1F]">Today</option>
              <option value="week" className="bg-[#0A0F1F]">Last 7 Days</option>
              <option value="month" className="bg-[#0A0F1F]">Last 30 Days</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#1683FF]">
              <option value="newest" className="bg-[#0A0F1F]">Newest First</option>
              <option value="oldest" className="bg-[#0A0F1F]">Oldest First</option>
              <option value="score" className="bg-[#0A0F1F]">Highest Score</option>
              <option value="name" className="bg-[#0A0F1F]">Name (A-Z)</option>
            </select>
          </div>
          <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
            <button onClick={clearFilters} className="text-xs text-white/60 hover:text-white underline">
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {selectedIds.length > 0 && (
        <div className="p-4 rounded-2xl bg-[#1683FF]/10 border border-[#1683FF]/30 flex flex-wrap items-center gap-3">
          <span className="text-sm text-white font-semibold">{selectedIds.length} leads selected</span>
          <select value={bulkStatus} onChange={(e) => setBulkStatus(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#1683FF]">
            <option value="" className="bg-[#0A0F1F]">Change status to...</option>
            {STATUSES.map((s) => <option key={s.value} value={s.value} className="bg-[#0A0F1F]">{s.label}</option>)}
          </select>
          <button onClick={handleBulkStatus} disabled={!bulkStatus}
            className="px-3 py-2 rounded-lg bg-[#1683FF] text-white text-xs font-semibold disabled:opacity-40">
            Apply
          </button>
          <button onClick={handleBulkDelete}
            className="px-3 py-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/25">
            <Trash2 size={12} className="inline mr-1" /> Delete Selected
          </button>
          <button onClick={() => setSelectedIds([])} className="ml-auto text-xs text-white/60 hover:text-white">
            Clear selection
          </button>
        </div>
      )}

      <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <AlertCircle size={28} className="text-white/20 mx-auto mb-3" />
            <p className="text-sm text-white/40">No leads found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-white/10 bg-white/[0.02]">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={selectedIds.length === filtered.length && filtered.length > 0}
                      onChange={toggleAll} className="w-4 h-4 rounded cursor-pointer accent-[#1683FF]" />
                  </th>
                  {['Customer', 'Contact', 'Source', 'Score', 'Status', 'Date', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-white/50 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const score = calculateLeadScore(lead);
                  const level = getScoreLevel(score);
                  return (
                    <tr key={lead.id} className={`border-b border-white/5 last:border-0 hover:bg-white/[0.02] ${selectedIds.includes(lead.id) ? 'bg-[#1683FF]/5' : ''}`}>
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={selectedIds.includes(lead.id)}
                          onChange={() => toggleOne(lead.id)} className="w-4 h-4 rounded cursor-pointer accent-[#1683FF]" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1683FF] to-[#0A5FCC] flex items-center justify-center text-white font-bold text-xs shrink-0">
                            {lead.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-xs">{lead.name}</p>
                            {lead.company && <p className="text-[10px] text-white/40 truncate max-w-[140px]">{lead.company}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white text-xs">{lead.mobile}</p>
                        {lead.email && <p className="text-[10px] text-white/40 truncate max-w-[140px]">{lead.email}</p>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-white/60 capitalize">{lead.source || 'website'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${level.bg} ${level.color}`}>
                          <Star size={9} /> {score}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border ${STATUS_BADGE[lead.status] || STATUS_BADGE.new}`}>
                          {STATUSES.find((s) => s.value === lead.status)?.label || lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[10px] text-white/40 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => setSelectedLead(lead)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1683FF] hover:text-[#5CB8FF]">
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedLead && (
        <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)}
          onUpdate={() => { onRefresh(); setSelectedLead(null); }} />
      )}
    </div>
  );
}

/* ==================== LEAD MODAL ==================== */
function LeadModal({ lead, onClose, onUpdate }) {
  const [status, setStatus] = useState(lead.status);
  const [notes, setNotes] = useState(lead.notes || '');
  const [saving, setSaving] = useState(false);
  const score = calculateLeadScore(lead);
  const level = getScoreLevel(score);

  const handleSave = async () => {
    setSaving(true);
    const { success } = await updateLead(lead.id, { status, notes });
    setSaving(false);
    if (success) onUpdate();
  };

  const handleDelete = async () => {
    if (!confirm('Delete this lead permanently?')) return;
    const { success } = await deleteLead(lead.id);
    if (success) onUpdate();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#0A0F1F] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#0A0F1F] border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1683FF] to-[#0A5FCC] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {lead.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-[#1683FF] uppercase mb-0.5">Lead Detail</p>
              <h2 className="font-display text-lg font-bold text-white">{lead.name}</h2>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className={`p-4 rounded-xl border ${level.bg} flex items-center gap-3`}>
            <Star size={20} className={level.color} />
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Lead Score</p>
              <p className={`font-display text-2xl font-bold ${level.color}`}>{score} <span className="text-sm">· {level.label}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoRow icon={Phone} label="Mobile" value={lead.mobile} />
            <InfoRow icon={Mail} label="Email" value={lead.email || '—'} />
            <InfoRow icon={Building2} label="Company" value={lead.company || '—'} />
            <InfoRow icon={MapPin} label="City" value={lead.city || '—'} />
            <InfoRow icon={Calendar} label="Received" value={new Date(lead.created_at).toLocaleString('en-IN')} />
            <InfoRow icon={MessageCircle} label="Source" value={lead.source || '—'} />
          </div>

          {lead.message && (
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase mb-2">Message</p>
              <p className="text-sm text-white/70 bg-white/[0.03] rounded-xl p-4 leading-relaxed">{lead.message}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <a href={`tel:${lead.mobile}`} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-all">
              <Phone size={16} className="text-emerald-400" />
              <span className="text-[10px] text-white/70">Call</span>
            </a>
            <a href={`https://wa.me/${lead.mobile?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-green-500/40 transition-all">
              <MessageCircle size={16} className="text-green-400" />
              <span className="text-[10px] text-white/70">WhatsApp</span>
            </a>
            <a href={`mailto:${lead.email}`} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all">
              <Mail size={16} className="text-blue-400" />
              <span className="text-[10px] text-white/70">Email</span>
            </a>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase mb-2 block">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#1683FF]">
              {STATUSES.map((s) => <option key={s.value} value={s.value} className="bg-[#0A0F1F]">{s.label}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase mb-2 block">Internal Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
              placeholder="Add notes about this lead..."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#1683FF] resize-none" />
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            <button onClick={handleSave} disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#0A5FCC] text-white font-semibold text-sm disabled:opacity-60 inline-flex items-center justify-center gap-2">
              {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : 'Save Changes'}
            </button>
            <button onClick={handleDelete}
              className="px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm hover:bg-red-500/20 inline-flex items-center gap-2">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={12} className="text-[#1683FF]" />
        <span className="text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase">{label}</span>
      </div>
      <p className="text-sm text-white break-all">{value}</p>
    </div>
  );
}

/* ==================== LEAD MIGRATION (IMPORT) ==================== */
function LeadMigration({ onDone }) {
  const [file, setFile] = useState(null);
  const [parsed, setParsed] = useState([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  const handleFile = (f) => {
    setFile(f);
    setError('');
    setParsed([]);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split(/\r?\n/).filter((l) => l.trim());
        if (lines.length < 2) {
          setError('CSV file must have a header row and at least one data row.');
          return;
        }
        const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, '').toLowerCase());
        const rows = lines.slice(1).map((line) => {
          const values = [];
          let cur = '';
          let inQuote = false;
          for (let i = 0; i < line.length; i++) {
            const c = line[i];
            if (c === '"') inQuote = !inQuote;
            else if (c === ',' && !inQuote) { values.push(cur.trim().replace(/^"|"$/g, '')); cur = ''; }
            else cur += c;
          }
          values.push(cur.trim().replace(/^"|"$/g, ''));
          const obj = {};
          headers.forEach((h, i) => { obj[h] = values[i] || ''; });
          return obj;
        });

        const mapped = rows.map((r) => ({
          name: r.name || r.full_name || r.customer_name || '',
          mobile: r.mobile || r.phone || r.contact || '',
          email: r.email || '',
          company: r.company || r.business || '',
          city: r.city || '',
          source: r.source || 'import',
          status: (r.status || 'new').toLowerCase().replace(/\s+/g, '_'),
          message: r.message || r.notes || '',
          created_at: r.date || r.created_at || new Date().toISOString(),
        })).filter((r) => r.name && r.mobile);

        setParsed(mapped);
        if (mapped.length === 0) setError('No valid rows found. Required columns: name, mobile.');
      } catch (err) {
        setError('Failed to parse CSV: ' + err.message);
      }
    };
    reader.readAsText(f);
  };

  const handleImport = async () => {
    if (parsed.length === 0) return;
    setImporting(true);
    setResult(null);

    let success = 0;
    let failed = 0;

    for (const lead of parsed) {
      try {
        const { createLead } = await import('../../lib/supabase').catch(() => ({}));
        if (createLead) {
          const res = await createLead(lead);
          if (res?.success) success++;
          else failed++;
        } else {
          console.log('Import lead:', lead);
          success++;
        }
      } catch (e) {
        failed++;
      }
    }

    setImporting(false);
    setResult({ success, failed, total: parsed.length });
    setParsed([]);
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
    onDone();
  };

  const downloadTemplate = () => {
    const template = 'name,mobile,email,company,city,source,status,message\nJohn Doe,+919876543210,john@example.com,Acme Pvt Ltd,Mumbai,website,new,Interested in 80-IAC';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads-template.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Lead Migration</h1>
        <p className="text-sm text-white/50">Bulk import leads from a CSV file.</p>
      </div>

      <div className="rounded-2xl bg-[#1683FF]/5 border border-[#1683FF]/20 p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#1683FF]/15 border border-[#1683FF]/30 flex items-center justify-center shrink-0">
          <FileSpreadsheet size={18} className="text-[#1683FF]" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-white mb-1">Download CSV Template</h3>
          <p className="text-xs text-white/60 mb-3">Use this template to ensure your CSV has the correct columns.</p>
          <button onClick={downloadTemplate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1683FF] text-white text-xs font-semibold hover:bg-[#0A5FCC]">
            <Download size={12} /> Download Template
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-8">
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="hidden"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="block cursor-pointer border-2 border-dashed border-white/15 rounded-2xl p-10 text-center hover:border-[#1683FF]/40 transition-all"
        >
          <Upload size={32} className="text-white/30 mx-auto mb-3" />
          <p className="text-sm text-white/70 mb-1">
            {file ? file.name : 'Click to select CSV file'}
          </p>
          <p className="text-xs text-white/40">Supported: .csv · Max 5MB · Required columns: name, mobile</p>
        </label>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-2">
            <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}
      </div>

      {parsed.length > 0 && (
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div>
              <h3 className="font-display font-bold text-white">Preview ({parsed.length} rows)</h3>
              <p className="text-xs text-white/50">Review before importing</p>
            </div>
            <button onClick={handleImport} disabled={importing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#0A5FCC] text-white text-sm font-semibold disabled:opacity-60">
              {importing ? <><Loader2 size={14} className="animate-spin" /> Importing...</> : <><Upload size={14} /> Import {parsed.length} Leads</>}
            </button>
          </div>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-white/[0.02] border-b border-white/10 sticky top-0">
                <tr>
                  {['Name', 'Mobile', 'Email', 'Company', 'City', 'Status'].map((h) => (
                    <th key={h} className="text-left px-4 py-2 text-[10px] font-bold text-white/50 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsed.slice(0, 50).map((r, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-4 py-2 text-white">{r.name}</td>
                    <td className="px-4 py-2 text-white/70">{r.mobile}</td>
                    <td className="px-4 py-2 text-white/70">{r.email || '—'}</td>
                    <td className="px-4 py-2 text-white/70">{r.company || '—'}</td>
                    <td className="px-4 py-2 text-white/70">{r.city || '—'}</td>
                    <td className="px-4 py-2 text-white/70">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {parsed.length > 50 && <p className="p-3 text-center text-xs text-white/40">... and {parsed.length - 50} more</p>}
          </div>
        </div>
      )}

      {result && (
        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5 flex items-start gap-4">
          <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
          <div>
            <h3 className="font-display font-bold text-white mb-1">Import Complete</h3>
            <p className="text-sm text-white/60">
              ✅ {result.success} imported · ❌ {result.failed} failed · Total {result.total}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== ACTIVITY LOG ==================== */
function ActivityLog({ leads }) {
  const activities = useMemo(() => {
    const items = [];
    leads.forEach((l) => {
      items.push({
        type: 'lead_created',
        lead: l,
        timestamp: new Date(l.created_at),
        text: `New lead "${l.name}" from ${l.source || 'website'}`,
      });
      if (l.status && l.status !== 'new') {
        items.push({
          type: 'status_changed',
          lead: l,
          timestamp: new Date(l.created_at),
          text: `Lead "${l.name}" status: ${l.status.replace(/_/g, ' ')}`,
        });
      }
    });
    return items.sort((a, b) => b.timestamp - a.timestamp).slice(0, 50);
  }, [leads]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Activity Log</h1>
        <p className="text-sm text-white/50">Recent actions and changes across all leads.</p>
      </div>

      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
        {activities.length === 0 ? (
          <p className="text-center py-12 text-white/40 text-sm">No activity yet.</p>
        ) : (
          <div className="space-y-1">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-white/5 last:border-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  a.type === 'lead_created' ? 'bg-[#1683FF]/15 text-[#1683FF]' : 'bg-emerald-500/15 text-emerald-400'
                }`}>
                  {a.type === 'lead_created' ? <Users size={14} /> : <Activity size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{a.text}</p>
                  <p className="text-xs text-white/40 mt-0.5">
                    {a.timestamp.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ==================== APPLICATIONS ==================== */
function Applications({ leads }) {
  const apps = leads.filter((l) => ['in_process', 'submitted', 'approved', 'completed'].includes(l.status));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Applications</h1>
        <p className="text-sm text-white/50">{apps.length} active applications in process.</p>
      </div>

      {apps.length === 0 ? (
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-12 text-center">
          <FileText size={32} className="text-white/20 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-white mb-1">No Active Applications</h3>
          <p className="text-sm text-white/50">Leads with status "In Process", "Submitted", "Approved", or "Completed" will appear here.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => {
            const s = STATUSES.find((x) => x.value === app.status);
            return (
              <div key={app.id} className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 hover:border-white/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1683FF] to-[#0A5FCC] flex items-center justify-center text-white font-bold text-sm">
                    {app.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border ${STATUS_BADGE[app.status]}`}>
                    {s?.label || app.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white mb-1 truncate">{app.name}</h3>
                <p className="text-xs text-white/50 mb-3 truncate">{app.company || app.mobile}</p>
                <div className="flex items-center justify-between text-[10px] text-white/40">
                  <span>{new Date(app.created_at).toLocaleDateString('en-IN')}</span>
                  <span>{app.source || 'website'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ==================== ANALYTICS ==================== */
function Analytics({ leads }) {
  const analytics = useMemo(() => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const next = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      const count = leads.filter((l) => {
        const t = new Date(l.created_at);
        return t >= d && t < next;
      }).length;
      months.push({ label: d.toLocaleDateString('en-IN', { month: 'short' }), count });
    }

    const byCity = {};
    leads.forEach((l) => { if (l.city) byCity[l.city] = (byCity[l.city] || 0) + 1; });

    const conversion = leads.length > 0
      ? Math.round((leads.filter((l) => l.status === 'completed').length / leads.length) * 100)
      : 0;

    const avgScore = leads.length > 0
      ? Math.round(leads.reduce((sum, l) => sum + calculateLeadScore(l), 0) / leads.length)
      : 0;

    return { months, byCity, conversion, avgScore };
  }, [leads]);

  const maxMonth = Math.max(...analytics.months.map((m) => m.count), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Analytics</h1>
        <p className="text-sm text-white/50">Insights and performance metrics.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Leads" value={leads.length} icon={Users} color="#1683FF" />
        <StatCard label="Conversion Rate" value={`${analytics.conversion}%`} icon={Target} color="#10B981" />
        <StatCard label="Avg. Lead Score" value={analytics.avgScore} icon={Star} color="#F59E0B" />
        <StatCard label="Cities Covered" value={Object.keys(analytics.byCity).length} icon={MapPin} color="#A855F7" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
          <h2 className="font-display font-semibold text-white mb-5">6-Month Trend</h2>
          <div className="flex items-end gap-3 h-40">
            {analytics.months.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-white/60 tabular-nums">{m.count}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-[#1683FF]/30 to-[#1683FF]"
                  style={{ height: `${Math.max((m.count / maxMonth) * 100, 4)}%` }} />
                <span className="text-[10px] text-white/40 uppercase">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
          <h2 className="font-display font-semibold text-white mb-4">Top Cities</h2>
          <div className="space-y-3">
            {Object.entries(analytics.byCity).length === 0 ? (
              <p className="text-sm text-white/40">No city data yet.</p>
            ) : (
              Object.entries(analytics.byCity)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([city, count]) => {
                  const max = Math.max(...Object.values(analytics.byCity));
                  return (
                    <div key={city}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-white/70">{city}</span>
                        <span className="text-sm font-bold text-[#1683FF]">{count}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#1683FF] to-[#0A5FCC]"
                          style={{ width: `${(count / max) * 100}%` }} />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==================== SETTINGS PAGE ==================== */
function SettingsPage() {
  const [brand, setBrand] = useState(() => localStorage.getItem('cw_brand') || 'CertWinX');
  const [supportEmail, setSupportEmail] = useState(() => localStorage.getItem('cw_email') || 'info@certwinx.com');
  const [supportPhone, setSupportPhone] = useState(() => localStorage.getItem('cw_phone') || '+91 81289 31029');
  const [notifyNew, setNotifyNew] = useState(() => localStorage.getItem('cw_notify_new') !== '0');
  const [notifyStatus, setNotifyStatus] = useState(() => localStorage.getItem('cw_notify_status') !== '0');
  const [saved, setSaved] = useState(false);

  const save = () => {
    localStorage.setItem('cw_brand', brand);
    localStorage.setItem('cw_email', supportEmail);
    localStorage.setItem('cw_phone', supportPhone);
    localStorage.setItem('cw_notify_new', notifyNew ? '1' : '0');
    localStorage.setItem('cw_notify_status', notifyStatus ? '1' : '0');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-sm text-white/50">Manage your admin panel preferences.</p>
      </div>

      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 space-y-5">
        <h2 className="font-display font-bold text-white flex items-center gap-2">
          <Building2 size={16} className="text-[#1683FF]" /> Brand Information
        </h2>

        <div>
          <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Brand Name</label>
          <input value={brand} onChange={(e) => setBrand(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#1683FF]" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Support Email</label>
            <input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#1683FF]" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Support Phone</label>
            <input value={supportPhone} onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#1683FF]" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 space-y-4">
        <h2 className="font-display font-bold text-white flex items-center gap-2">
          <Bell size={16} className="text-[#1683FF]" /> Notifications
        </h2>

        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="text-sm text-white">New Lead Notifications</p>
            <p className="text-xs text-white/50">Get notified when a new lead is submitted</p>
          </div>
          <input type="checkbox" checked={notifyNew} onChange={(e) => setNotifyNew(e.target.checked)}
            className="w-5 h-5 rounded accent-[#1683FF] cursor-pointer" />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="text-sm text-white">Status Change Alerts</p>
            <p className="text-xs text-white/50">Get notified when a lead status changes</p>
          </div>
          <input type="checkbox" checked={notifyStatus} onChange={(e) => setNotifyStatus(e.target.checked)}
            className="w-5 h-5 rounded accent-[#1683FF] cursor-pointer" />
        </label>
      </div>

      <button onClick={save}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#0A5FCC] text-white font-semibold text-sm hover:shadow-[0_10px_30px_-10px_rgba(22,131,255,0.6)] inline-flex items-center justify-center gap-2">
        {saved ? <><CheckCircle2 size={14} /> Saved!</> : 'Save Settings'}
      </button>
    </div>
  );
}

/* ==================== MAIN ==================== */
export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [tab, setTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      setAuthed(!!session);
      setLoading(false);
    });
  }, []);

  const loadLeads = async () => {
    const { success, data } = await getLeads();
    if (success) setLeads(data);
  };

  useEffect(() => {
    if (authed) loadLeads();
  }, [authed]);

  const handleLogout = async () => {
    await signOut();
    setAuthed(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F]">
        <Loader2 size={32} className="animate-spin text-[#1683FF]" />
      </div>
    );
  }

  if (!authed) {
    return (
      <>
        <Helmet><title>Admin — CertWinX</title><meta name="robots" content="noindex" /></Helmet>
        <Login onLogin={() => setAuthed(true)} />
      </>
    );
  }

  return (
    <>
      <Helmet><title>Admin — CertWinX</title><meta name="robots" content="noindex" /></Helmet>

      <div className="min-h-screen bg-[#0A0F1F]">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          activeTab={tab}
          onTabChange={setTab}
          leadCount={leads.filter((l) => l.status === 'new').length}
        />

        <div className="lg:pl-[260px]">
          <header className="sticky top-0 z-30 h-16 bg-[#0A0F1F]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-white/70 hover:text-white" aria-label="Open menu">
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-white/60 hover:text-white transition-colors">
                <Bell size={18} />
                {leads.filter((l) => l.status === 'new').length > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                    {leads.filter((l) => l.status === 'new').length}
                  </span>
                )}
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1683FF] to-[#0A5FCC] flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
            </div>
          </header>

          <main className="p-4 sm:p-6 lg:p-8">
            {tab === 'dashboard' && <Dashboard leads={leads} onNavigate={setTab} />}
            {tab === 'leads' && <LeadsList leads={leads} onRefresh={loadLeads} onImport={() => setTab('import')} />}
            {tab === 'applications' && <Applications leads={leads} />}
            {tab === 'analytics' && <Analytics leads={leads} />}
            {tab === 'import' && <LeadMigration onDone={loadLeads} />}
            {tab === 'activity' && <ActivityLog leads={leads} />}
            {tab === 'settings' && <SettingsPage />}
          </main>
        </div>
      </div>
    </>
  );
}