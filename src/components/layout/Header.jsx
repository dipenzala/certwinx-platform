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

const BUBBLE_CONFIG = {
  maxConcurrent: 25,
  spawnInterval: 1200,
  minSize: 4,
  maxSize: 14,
  minOpacity: 0.15,
  maxOpacity: 0.45,
  colors: {
    blue: '#2D9CFF',
    cyan: '#5CB8FF',
    gold: '#CCAB6E',
    white: '#FFFFFF',
  },
  riseDuration: { min: 12, max: 22 },
  popDuration: 1.5,
};

const METRICS = [
  { id: 'leads', icon: Users, label: 'Leads', value: 1247, suffix: '+', trend: '+12.5%' },
  { id: 'approvals', icon: CheckCircle2, label: 'Approvals', value: 89, suffix: '+', trend: '+8.3%' },
  { id: 'success', icon: TrendingUp, label: 'Success', value: 99, suffix: '%', trend: '+2.1%' },
];

export default function Header({ onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const [metricIndex, setMetricIndex] = useState(0);
  const [displayValues, setDisplayValues] = useState(() =>
    METRICS.map((m) => Math.floor(m.value * 0.85))
  );
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50, active: false });
  const headerRef = useRef(null);
  const bubblesContainerRef = useRef(null);
  const lastScrollRef = useRef(0);
  const bubbleIdRef = useRef(0);
  const location = useLocation();

  /* NOTIFY PARENT */
  useEffect(() => {
    if (onMenuToggle) onMenuToggle(open);
  }, [open, onMenuToggle]);

  /* SCROLL DETECTION */
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);
      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollRef.current + 5) setHidden(true);
        else if (currentScrollY < lastScrollRef.current - 5) setHidden(false);
      } else {
        setHidden(false);
      }
      lastScrollRef.current = currentScrollY;
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
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  /* BUBBLE SPAWNER */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const spawnBubble = () => {
      setBubbles((prev) => {
        const alive = prev.filter((b) => !b.dead);
        if (alive.length >= BUBBLE_CONFIG.maxConcurrent) return alive;
        const id = `bubble-${bubbleIdRef.current++}`;
        const size = BUBBLE_CONFIG.minSize + Math.random() * (BUBBLE_CONFIG.maxSize - BUBBLE_CONFIG.minSize);
        const colors = Object.values(BUBBLE_CONFIG.colors);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = BUBBLE_CONFIG.minOpacity + Math.random() * (BUBBLE_CONFIG.maxOpacity - BUBBLE_CONFIG.minOpacity);
        const left = 3 + Math.random() * 94;
        const riseDuration = BUBBLE_CONFIG.riseDuration.min + Math.random() * (BUBBLE_CONFIG.riseDuration.max - BUBBLE_CONFIG.riseDuration.min);
        const drift = Math.random() * 60 - 30;
        const wobble = Math.random() * 20 - 10;
        return [...alive, { id, left, size, opacity, color, riseDuration, drift, wobble, dead: false }];
      });
    };
    for (let i = 0; i < 5; i++) setTimeout(spawnBubble, i * 200);
    const interval = setInterval(spawnBubble, BUBBLE_CONFIG.spawnInterval);
    return () => clearInterval(interval);
  }, []);

  /* ANIMATE BUBBLES */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = bubblesContainerRef.current;
    if (!container) return;
    const timeouts = [];
    bubbles.forEach((bubble) => {
      const el = container.querySelector(`[data-bubble-id="${bubble.id}"]`);
      if (!el || el.dataset.animated === '1') return;
      el.dataset.animated = '1';
      gsap.set(el, { y: 0, x: 0, scale: 0.3, opacity: 0 });
      const riseTween = gsap.to(el, {
        y: -(window.innerHeight * 0.25),
        x: bubble.drift,
        scale: 1,
        opacity: bubble.opacity,
        duration: bubble.riseDuration,
        ease: 'none',
        onComplete: () => {
          const popTween = gsap.to(el, {
            scale: 1.8, opacity: 0,
            duration: BUBBLE_CONFIG.popDuration,
            ease: 'power2.out',
            onComplete: () => {
              setBubbles((prev) => prev.map((b) => (b.id === bubble.id ? { ...b, dead: true } : b)));
            },
          });
          return () => popTween.kill();
        },
      });
      const wobbleTween = gsap.to(el, {
        x: `+=${bubble.wobble}`,
        duration: bubble.riseDuration / 4,
        ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
      const pulseTween = gsap.to(el, {
        scale: 1.15,
        duration: bubble.riseDuration / 3,
        ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
      timeouts.push(() => { riseTween.kill(); wobbleTween.kill(); pulseTween.kill(); });
    });
    return () => timeouts.forEach((kill) => kill());
  }, [bubbles]);

  /* CURSOR TRACKING */
  useEffect(() => {
    const root = headerRef.current;
    if (!root) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const handleMouseMove = (e) => {
      const rect = root.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCursorPos({ x, y, active: true });
    };
    const handleMouseLeave = () => setCursorPos((prev) => ({ ...prev, active: false }));
    root.addEventListener('mousemove', handleMouseMove);
    root.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      root.removeEventListener('mousemove', handleMouseMove);
      root.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  /* INTRO */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = headerRef.current;
    if (!el) return;
    gsap.fromTo(el, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out', delay: 0.4 });
  }, []);

  /* AMBIENT */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = headerRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-water-gradient]', { backgroundPosition: '300% 0', duration: 25, ease: 'none', repeat: -1 });
      gsap.to('[data-shimmer-line]', { backgroundPosition: '-200% 0', duration: 15, ease: 'none', repeat: -1 });
      gsap.to('[data-logo-glow]', { opacity: 0.55, scale: 1.05, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('[data-live-dot]', { scale: 1.6, opacity: 0.4, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('[data-wa-glow]', { opacity: 0.9, scale: 1.2, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('[data-tagline-shimmer]', { backgroundPosition: '200% 0', duration: 5, ease: 'none', repeat: -1 });
      gsap.to('[data-eligibility-glow]', { opacity: 0.8, scale: 1.1, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
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
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0A0F1F]" />
          <div
            data-water-gradient
            className="absolute inset-0 opacity-60"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(45,156,255,0.15) 20%, rgba(92,184,255,0.08) 35%, rgba(204,171,110,0.1) 50%, rgba(45,156,255,0.15) 70%, transparent 100%)',
              backgroundSize: '300% 100%',
            }}
          />
          <div className="absolute inset-0 backdrop-blur-2xl" />

          {/* Bubbles */}
          <div ref={bubblesContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {bubbles.map((bubble) => (
              <span
                key={bubble.id}
                data-bubble-id={bubble.id}
                className="absolute rounded-full will-change-transform"
                style={{
                  left: `${bubble.left}%`,
                  bottom: '-20px',
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  background: `radial-gradient(circle at 30% 30%, ${bubble.color}EE, ${bubble.color}88 50%, ${bubble.color}33 100%)`,
                  boxShadow: `0 0 ${bubble.size * 2}px ${bubble.color}88`,
                  opacity: 0,
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Cursor ripple */}
          {cursorPos.active && (
            <div
              className="absolute pointer-events-none transition-all duration-1000 ease-out"
              style={{
                left: `${cursorPos.x}%`, top: `${cursorPos.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(45,156,255,0.15), transparent 70%)',
                opacity: 0.5, filter: 'blur(8px)',
              }}
              aria-hidden="true"
            />
          )}

          {/* Top shimmer */}
          <div
            data-shimmer-line
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(45,156,255,0.7) 30%, rgba(204,171,110,0.9) 50%, rgba(45,156,255,0.7) 70%, transparent 100%)',
              backgroundSize: '200% 100%',
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
              {/* ============ LOGO + TAGLINE ============ */}
              <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0 flex-1">
                {/* Logo */}
                <div className="relative flex items-center shrink-0">
                  <div
                    data-logo-glow
                    className="absolute inset-0 -m-3 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(45,156,255,0.4), transparent 70%)',
                      filter: 'blur(16px)', opacity: 0.4,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className={`relative transition-transform duration-700 ${
                      scrolled ? 'scale-[0.95]' : 'scale-100'
                    }`}
                  >
                    <Logo size="md" className="lg:!h-[46px]" />
                  </div>
                </div>

                {/* Vertical Divider */}
                <span
                  className="hidden sm:block w-px h-9 bg-gradient-to-b from-transparent via-blue/40 to-transparent shrink-0"
                  aria-hidden="true"
                />

                {/* Tagline — MOBILE PAR HIDDEN (sm:flex) */}
                <div className="hidden sm:flex flex-col leading-none min-w-0 items-center text-center">
                  <span
                    data-tagline-shimmer
                    className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold tracking-[0.22em] uppercase whitespace-nowrap"
                    style={{
                      background:
                        'linear-gradient(90deg, #CCAB6E 0%, #F6E9C9 25%, #CCAB6E 50%, #F6E9C9 75%, #CCAB6E 100%)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 0 20px rgba(204,171,110,0.3)',
                    }}
                  >
                    Aapki Tarakki Ka Saathi
                  </span>
                  <span
                    className="text-[6px] sm:text-[7px] lg:text-[8px] italic tracking-wide mt-0.5 whitespace-nowrap"
                    style={{
                      color: '#5CB8FF',
                      textShadow: '0 0 12px rgba(92,184,255,0.4)',
                    }}
                  >
                    Bharosa Aapka, Jimmedari Humari
                  </span>
                </div>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden xl:flex items-center gap-1">
                {NAV.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group relative px-3 py-2 text-[12px] font-medium tracking-wide transition-colors duration-500 ${
                        active ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 h-px transition-all duration-700 ease-out ${
                          active ? 'w-[70%] opacity-100' : 'w-0 opacity-0 group-hover:w-[70%] group-hover:opacity-100'
                        }`}
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(45,156,255,0.9), rgba(204,171,110,0.9), rgba(45,156,255,0.9), transparent)' }}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Metric Ticker — tablet+ */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm shrink-0">
                <span className="relative flex items-center justify-center w-1.5 h-1.5 shrink-0">
                  <span data-live-dot className="absolute inset-0 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.8)' }} />
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
                          {displayValues[i].toLocaleString()}{m.suffix}
                        </span>
                        <span className="text-[9px] text-white/50 whitespace-nowrap">{m.label}</span>
                        <TrendingUp size={8} className="text-green-400 shrink-0" strokeWidth={2.5} />
                        <span className="text-[9px] font-semibold text-green-400">{m.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[12px] font-medium text-white/60 hover:text-white transition-colors duration-500"
                >
                  <MessageCircle size={14} strokeWidth={1.8} className="transition-transform duration-500 group-hover:scale-110" />
                  <span>WhatsApp</span>
                </a>
                <Link
                  to="/eligibility"
                  className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden transition-all duration-500"
                >
                  <span
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #1683FF 0%, #0A5FCC 100%)' }}
                  />
                  <span className="relative text-white text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    Check Eligibility
                    <ArrowUpRight size={12} strokeWidth={2} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>

              {/* ============ MOBILE ACTIONS ============ */}
              <div className="lg:hidden flex items-center gap-1 shrink-0">
                {!open && (
                  <>
                    {/* Eligibility Button — COMPACT */}
                    <Link
                      to="/eligibility"
                      aria-label="Check Eligibility"
                      className="relative flex items-center justify-center px-2.5 h-8 rounded-full active:scale-95 transition-transform overflow-hidden group"
                    >
                      <span
                        className="absolute inset-0 rounded-full z-0"
                        style={{
                          background: 'linear-gradient(135deg, #2D9CFF 0%, #1683FF 50%, #0A5FCC 100%)',
                        }}
                      />
                      <span
                        data-eligibility-glow
                        className="absolute -inset-1 rounded-full opacity-50 blur-md pointer-events-none z-0"
                        style={{
                          background: 'linear-gradient(135deg, #2D9CFF, #CCAB6E)',
                        }}
                        aria-hidden="true"
                      />
                      <span className="relative z-10 flex items-center gap-1 text-white text-[9px] font-bold tracking-wide uppercase whitespace-nowrap">
                        <CheckCircle2 size={10} strokeWidth={2.5} />
                        Eligibility
                      </span>
                    </Link>

                    {/* WhatsApp — COMPACT */}
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="relative flex items-center justify-center w-8 h-8 rounded-full active:scale-95 transition-transform shrink-0"
                    >
                      <span
                        data-wa-glow
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(37,211,102,0.7), transparent 70%)',
                          filter: 'blur(10px)', opacity: 0.6,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className="absolute inset-0 rounded-full border border-green-400/50"
                        style={{
                          background: 'linear-gradient(135deg, rgba(37,211,102,0.2) 0%, rgba(10,15,31,0.9) 100%)',
                        }}
                      />
                      <MessageCircle size={14} className="relative text-green-400" strokeWidth={2.2} />
                      <span className="absolute top-0.5 right-0.5 flex items-center justify-center w-2 h-2">
                        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                        <span className="relative w-1.5 h-1.5 rounded-full bg-green-400 border border-[#0A0F1F]" />
                      </span>
                    </a>
                  </>
                )}

                {/* Menu toggle — COMPACT */}
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
            background: 'radial-gradient(ellipse at top left, rgba(45,156,255,0.18), transparent 50%), radial-gradient(ellipse at bottom right, rgba(204,171,110,0.1), transparent 50%)',
          }}
        />

        <nav className="relative h-full flex flex-col pt-20 pb-8 px-5 overflow-y-auto">

          {/* BACK BUTTON */}
          <button
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = '/';
                }
              }, 200);
            }}
            className="self-start mb-5 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all duration-300 active:scale-95"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="text-[11px] font-semibold tracking-wider uppercase">
              Back
            </span>
          </button>

          {/* Logo */}
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
                    {displayValues[i].toLocaleString()}{m.suffix}
                  </p>
                  <p className="text-[8px] text-white/40 uppercase tracking-wider mt-0.5">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col">
            {NAV.map((item, i) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center justify-between py-3 border-b border-white/8 transition-colors duration-500 ${
                    active ? 'text-blue' : 'text-white/85 hover:text-white'
                  }`}
                  style={{
                    transform: open ? 'translateY(0)' : 'translateY(12px)',
                    opacity: open ? 1 : 0,
                    transition: `all 0.5s ${0.05 + i * 0.03}s cubic-bezier(0.19, 1, 0.22, 1)`,
                  }}
                >
                  <span className="font-display text-xl font-normal tracking-tight">
                    {item.label}
                  </span>
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
            >
              <span className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1683FF 0%, #0A5FCC 100%)' }} />
              <span className="relative inline-flex items-center justify-center gap-2">
                <CheckCircle2 size={13} strokeWidth={2.2} />
                Check Eligibility
              </span>
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full py-3 text-center font-display text-[11px] font-bold tracking-wider uppercase text-white rounded-full overflow-hidden border border-green-400/40 inline-flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.15) 0%, rgba(10,15,31,0.9) 100%)' }}
            >
              <span
                className="absolute inset-0 rounded-full pointer-events-none opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(37,211,102,0.35), transparent 70%)',
                  filter: 'blur(20px)',
                }}
                aria-hidden="true"
              />
              <MessageCircle size={13} className="relative text-green-400" strokeWidth={2.2} />
              <span className="relative">WhatsApp</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}