import { useEffect, useRef, useState } from 'react';
import Logo from '../ui/Logo';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, MessageCircle, ArrowUpRight,
  CheckCircle2, Sparkles, Phone,
} from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { getWhatsAppLink, PHONE_NUMBER } from '../../lib/constants';

const NAV = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Schemes', path: '/schemes' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Funding', path: '/funding' },
  { label: 'Startup India', path: '/startup' },
  { label: '80-IAC', path: '/services/section-80-iac' },
  { label: 'Contact', path: '/contact' },
];

export default function Header({ onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
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
        setScrolled(y > 20);
        if (y > 200) {
          if (y > lastScrollRef.current + 8) setHidden(true);
          else if (y < lastScrollRef.current - 8) setHidden(false);
        } else {
          setHidden(false);
        }
        lastScrollRef.current = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Header reveal on mount */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = headerRef.current;
    if (!el) return;
    gsap.fromTo(el, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' });
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ transform: 'translateZ(0)' }}
      >
        <div
          className={`w-full transition-all duration-300 border-b ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md border-line shadow-[0_4px_20px_-4px_rgba(22,58,138,0.06)]'
              : 'bg-white/80 backdrop-blur-sm border-line/60'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div
              className={`flex items-center justify-between gap-4 transition-all duration-300 ${
                scrolled ? 'h-16' : 'h-18 lg:h-20'
              }`}
            >
              {/* ============ BRAND LOGO ============ */}
              <div className="flex items-center shrink-0">
                <Logo size={scrolled ? 'md' : 'lg'} />
              </div>

              {/* ============ DESKTOP NAVIGATION ============ */}
              <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
                {NAV.map((item) => {
                  const active = location.pathname === item.path;
                  const is80IAC = item.label === '80-IAC';
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-3.5 py-2 text-[13px] font-medium tracking-tight rounded-lg transition-all duration-200 ${
                        active
                          ? 'text-blue font-semibold bg-blue-soft/60'
                          : is80IAC
                          ? 'text-blue-deep font-semibold hover:bg-blue-soft/40'
                          : 'text-graphite hover:text-ink hover:bg-canvas'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-blue rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* ============ AUTHENTIC ENTERPRISE BADGE ============ */}
              <div className="hidden lg:flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-soft border border-blue/15 text-[11px] font-medium text-blue-deep">
                  <Sparkles size={12} className="text-blue" />
                  <span>DPIIT & Schemes Advisory</span>
                </span>
              </div>

              {/* ============ DESKTOP CTAs ============ */}
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                {/* WhatsApp */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200"
                >
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                  </span>
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>

                {/* Check Eligibility */}
                <Link
                  to="/eligibility"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue hover:bg-blue-hover text-white text-xs font-semibold shadow-[0_8px_20px_-4px_rgba(28,131,243,0.35)] hover:shadow-[0_12px_24px_-4px_rgba(28,131,243,0.45)] transition-all duration-200"
                >
                  <span>Check Eligibility</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>

              {/* ============ MOBILE ACTIONS ============ */}
              <div className="xl:hidden flex items-center gap-2">
                <Link
                  to="/eligibility"
                  className="sm:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue text-white text-[11px] font-semibold"
                >
                  <span>Eligibility</span>
                </Link>

                <button
                  onClick={() => setOpen(!open)}
                  className="p-2 text-ink rounded-xl border border-line bg-canvas hover:bg-paper transition-colors"
                  aria-label={open ? 'Close Menu' : 'Open Navigation Menu'}
                  aria-expanded={open}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ============ MOBILE NAVIGATION DRAWER ============ */}
      <div
        className={`fixed inset-0 z-50 xl:hidden transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-line">
            <Logo size="md" />
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-xl text-graphite hover:text-ink hover:bg-canvas"
              aria-label="Close Menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Official Tagline */}
          <div className="py-4">
            <p className="text-[10px] font-bold tracking-[0.15em] text-blue uppercase">
              AAPKI TARAKKI KA SAATHI
            </p>
            <p className="text-xs text-graphite font-medium">
              Bharosha Apka, Jimmedari Humari
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 overflow-y-auto py-4 space-y-1">
            {NAV.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-blue-soft text-blue'
                      : 'text-graphite hover:text-ink hover:bg-canvas'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={15} className="opacity-40" />
                </Link>
              );
            })}
          </nav>

          {/* Bottom CTAs */}
          <div className="pt-4 border-t border-line space-y-2.5">
            <Link
              to="/eligibility"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue text-white text-xs font-semibold shadow-sm text-center"
            >
              <CheckCircle2 size={15} />
              <span>Check Scheme Eligibility</span>
            </Link>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center"
            >
              <MessageCircle size={15} />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="w-full inline-flex items-center justify-center gap-2 py-2 text-xs font-medium text-graphite text-center hover:text-ink"
            >
              <Phone size={13} />
              <span>Call Advisory: {PHONE_NUMBER}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
