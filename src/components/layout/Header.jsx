import { useEffect, useRef, useState } from 'react';
import Logo from '../ui/Logo';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, MessageCircle, ArrowUpRight,
  TrendingUp, CheckCircle2, Users,
} from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { getWhatsAppLink } from '../../lib/constants';

const NAV = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Schemes', path: '/schemes' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Funding', path: '/funding' },
  { label: 'Startup', path: '/startup' },
  { label: '80-IAC', path: '/services/section-80-iac' },
  { label: 'Contact', path: '/contact' },
];

const METRICS = [
  { id: 'leads', icon: Users, label: 'Leads', value: 1247, suffix: '+', trend: '+12.5%' },
  { id: 'approvals', icon: CheckCircle2, label: 'Approvals', value: 89, suffix: '+', trend: '+8.3%' },
  { id: 'success', icon: TrendingUp, label: 'Success', value: 99, suffix: '%', trend: '+2.1%' },
];

export default function Header({ onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [metricIndex, setMetricIndex] = useState(0);
  const [displayValues, setDisplayValues] = useState(() =>
    METRICS.map((m) => Math.floor(m.value * 0.85))
  );
  const headerRef = useRef(null);
  const lastScrollRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    if (onMenuToggle) onMenuToggle(open);
  }, [open, onMenuToggle]);

  /* SCROLL — throttled with rAF */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        if (y > 200) {
          if (y > lastScrollRef.current + 5) setHidden(true);
          else if (y < lastScrollRef.current - 5) setHidden(false);
        } else setHidden(false);
        lastScrollRef.current = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* METRIC TICKER */
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricIndex((i) => (i + 1) % METRICS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  /* COUNT UP */
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValues((prev) =>
        prev.map((val, i) => {
          const target = METRICS[i].value;
          if (val < target) return Math.min(target, val + Math.ceil((target - val) * 0.15));
          return val;
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /* INTRO — simple fade */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = headerRef.current;
    if (!el) return;
    gsap.fromTo(el, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 });
  }, []);

  /* LIGHT AMBIENT — sirf 3 halke animations */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = headerRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      /* Live dot pulse — CSS-like, very light */
      gsap.to('[data-live-dot]', {
        scale: 1.5,
        opacity: 0.5,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      /* WhatsApp glow pulse — light */
      gsap.to('[data-wa-glow]', {
        opacity: 0.9,
        scale: 1.15,
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      /* Logo glow pulse — very light */
      gsap.to('[data-logo-glow]', {
        opacity: 0.6,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="relative overflow-hidden">
          {/* Solid navy + subtle static gradient — NO animation */}
          <div className="absolute inset-0 bg-[#0A0F1F]" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(45,156,255,0.08) 25%, rgba(204,171,110,0.05) 50%, rgba(45,156,255,0.08) 75%, transparent 100%)',
            }}
          />
          <div className="absolute inset-0 backdrop-blur-2xl" />

          {/* Static shimmer lines — NO animation */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(45,156,255,0.5) 50%, transparent 100%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(45,156,255,0.2) 50%, transparent 100%)' }}
          />

          <div className="relative max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10">
            <div
              className={`flex items-center justify-between gap-2 transition-all duration-700 ${
                scrolled ? 'h-14 sm:h-16 lg:h-18' : 'h-16 sm:h-18 lg:h-20'
              }`}
            >
              {/* ============ LOGO (No Tagline) ============ */}
              <div className="flex items-center shrink-0 relative z-20">
                <div className="relative flex items-center shrink-0">
                  <div
                    data-logo-glow
                    className="absolute inset-0 -m-2 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(45,156,255,0.35), transparent 70%)',
                      filter: 'blur(14px)',
                      opacity: 0.4,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className={`relative transition-transform duration-700 ${
                      scrolled ? 'scale-[0.95]' : 'scale-100'
                    }`}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    <Logo size="md" className="lg:!h-[46px]" />
                  </div>
                </div>
              </div>

              {/* ============ DESKTOP NAV ============ */}
              <nav className="hidden xl:flex items-center gap-1 relative z-10">
                {NAV.map((item) => {
                  const active = location.pathname === item.path;
                  const is80IAC = item.label === '80-IAC';
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group relative px-3 py-2 text-[12px] font-medium tracking-wide transition-colors duration-500 whitespace-nowrap ${
                        active ? 'text-white' : is80IAC ? 'text-blue' : 'text-white/60 hover:text-white'
                      }`}
                      style={
                        is80IAC
                          ? {
                              textShadow:
                                '0 0 8px rgba(45, 156, 255, 0.8), 0 0 16px rgba(45, 156, 255, 0.5)',
                            }
                          : undefined
                      }
                    >
                      {item.label}
                      <span
                        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 h-px transition-all duration-700 ease-out ${
                          active
                            ? 'w-[70%] opacity-100'
                            : 'w-0 opacity-0 group-hover:w-[70%] group-hover:opacity-100'
                        }`}
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(45,156,255,0.9), rgba(204,171,110,0.9), rgba(45,156,255,0.9), transparent)',
                        }}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* ============ METRIC TICKER ============ */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shrink-0 relative z-10">
                <span className="relative flex items-center justify-center w-1.5 h-1.5 shrink-0">
                  <span data-live-dot className="absolute inset-0 rounded-full bg-green-400" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
                </span>
                <div className="relative h-4 w-[105px] lg:w-[120px] overflow-hidden">
                  <div
                    className="absolute inset-0 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                    style={{ transform: `translateY(-${metricIndex * 16}px)` }}
                  >
                    {METRICS.map((m, i) => (
                      <div key={m.id} className="flex items-center gap-1.5 h-4 shrink-0">
                        <span className="font-display text-[10px] lg:text-[11px] font-bold text-white tabular">
                          {displayValues[i].toLocaleString()}
                          {m.suffix}
                        </span>
                        <span className="text-[9px] text-white/50 whitespace-nowrap">{m.label}</span>
                        <TrendingUp size={8} className="text-green-400 shrink-0" strokeWidth={2.5} />
                        <span className="text-[9px] font-semibold text-green-400">{m.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ============ DESKTOP CTAs ============ */}
              <div className="hidden lg:flex items-center gap-3 shrink-0 relative z-10">
                {/* WhatsApp — GREEN GLOW (static glow, no animation) */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium text-green-400 hover:text-green-300 transition-all duration-500"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(37,211,102,0.08) 0%, rgba(10,15,31,0.6) 100%)',
                    border: '1px solid rgba(37,211,102,0.3)',
                    boxShadow: '0 0 12px rgba(37,211,102,0.25), inset 0 0 12px rgba(37,211,102,0.08)',
                  }}
                >
                  <MessageCircle size={14} strokeWidth={1.8} className="relative" />
                  <span className="relative">WhatsApp</span>
                </a>

                {/* Check Eligibility — BLUE static */}
                <Link
                  to="/eligibility"
                  className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #1683FF 0%, #0A5FCC 100%)',
                    boxShadow: '0 0 14px rgba(22,131,255,0.35)',
                  }}
                >
                  <span className="relative text-white text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    Check Eligibility
                    <ArrowUpRight size={12} strokeWidth={2} />
                  </span>
                </Link>
              </div>

              {/* ============ MOBILE ACTIONS ============ */}
              <div className="lg:hidden flex items-center gap-1 shrink-0 relative z-10">
                {!open && (
                  <>
                    {/* Eligibility button — static */}
                    <Link
                      to="/eligibility"
                      aria-label="Check Eligibility"
                      className="relative flex items-center justify-center px-2.5 h-8 rounded-full active:scale-95 transition-transform overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #2D9CFF 0%, #1683FF 50%, #0A5FCC 100%)',
                        boxShadow: '0 0 10px rgba(45,156,255,0.35)',
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-1 text-white text-[9px] font-bold tracking-wide uppercase whitespace-nowrap">
                        <CheckCircle2 size={10} strokeWidth={2.5} />
                        Eligibility
                      </span>
                    </Link>

                    {/* WhatsApp — static green glow */}
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="relative flex items-center justify-center w-8 h-8 rounded-full active:scale-95 transition-transform shrink-0"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(37,211,102,0.2) 0%, rgba(10,15,31,0.9) 100%)',
                        border: '1px solid rgba(37,211,102,0.5)',
                        boxShadow: '0 0 10px rgba(37,211,102,0.3)',
                      }}
                    >
                      <MessageCircle size={14} className="relative text-green-400" strokeWidth={2.2} />
                      <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-2 h-2">
                        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                        <span className="relative w-1.5 h-1.5 rounded-full bg-green-400 border border-[#0A0F1F]" />
                      </span>
                    </a>
                  </>
                )}

                {/* Menu toggle */}
                <button
                  onClick={() => setOpen(!open)}
                  className="relative z-[60] p-1.5 text-white rounded-lg hover:bg-white/5 transition-colors shrink-0"
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                >
                  {open ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============ MOBILE MENU ============ */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[#0A0F1F]" onClick={() => setOpen(false)} />
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top left, rgba(45,156,255,0.18), transparent 50%), radial-gradient(ellipse at bottom right, rgba(204,171,110,0.1), transparent 50%)',
          }}
        />

        <nav className="relative h-full flex flex-col pt-20 pb-8 px-5 overflow-y-auto">
          <button
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                if (window.history.length > 1) window.history.back();
                else window.location.href = '/';
              }, 200);
            }}
            className="self-start mb-5 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/10 text-white/80"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="text-[11px] font-semibold tracking-wider uppercase">Back</span>
          </button>

          <div className="mb-6">
            <Logo size="md" />
          </div>

          {/* Live Activity */}
          <div className="mb-5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/8">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
              </span>
              <span className="text-[9px] font-bold tracking-[0.15em] text-green-400 uppercase">
                Live Activity
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {METRICS.map((m, i) => (
                <div key={m.id}>
                  <p className="font-display text-base font-bold text-white tabular">
                    {displayValues[i].toLocaleString()}
                    {m.suffix}
                  </p>
                  <p className="text-[8px] text-white/40 uppercase tracking-wider mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col">
            {NAV.map((item, i) => {
              const active = location.pathname === item.path;
              const is80IAC = item.label === '80-IAC';
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center justify-between py-3 border-b border-white/8 transition-colors duration-500 ${
                    active ? 'text-blue' : is80IAC ? 'text-blue' : 'text-white/85 hover:text-white'
                  }`}
                  style={{
                    transform: open ? 'translateY(0)' : 'translateY(12px)',
                    opacity: open ? 1 : 0,
                    transition: `all 0.5s ${0.05 + i * 0.03}s cubic-bezier(0.19, 1, 0.22, 1)`,
                    textShadow: is80IAC ? '0 0 8px rgba(45, 156, 255, 0.8)' : undefined,
                  }}
                >
                  <span className="font-display text-xl font-normal tracking-tight">{item.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="text-white/30 group-hover:text-blue transition-all duration-300 shrink-0"
                  />
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-blue" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="mt-auto flex flex-col gap-2.5 pt-6">
            <Link
              to="/eligibility"
              className="relative w-full py-3 text-center font-display text-[11px] font-bold tracking-wider uppercase text-white rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1683FF 0%, #0A5FCC 100%)',
                boxShadow: '0 0 14px rgba(22,131,255,0.35)',
              }}
            >
              <span className="relative inline-flex items-center justify-center gap-2">
                <CheckCircle2 size={13} strokeWidth={2.2} />
                Check Eligibility
              </span>
            </Link>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full py-3 text-center font-display text-[11px] font-bold tracking-wider uppercase text-green-400 rounded-full inline-flex items-center justify-center gap-2"
              style={{
                background:
                  'linear-gradient(135deg, rgba(37,211,102,0.12) 0%, rgba(10,15,31,0.9) 100%)',
                border: '1px solid rgba(37,211,102,0.4)',
                boxShadow: '0 0 14px rgba(37,211,102,0.25)',
              }}
            >
              <MessageCircle size={13} className="relative" strokeWidth={2.2} />
              <span className="relative">WhatsApp</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}