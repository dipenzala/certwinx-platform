import { useEffect, useRef, useState } from 'react';
import Logo from '../ui/Logo';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, MessageCircle, ArrowUpRight,
  ChevronDown, Sparkles, Building2, Rocket, Award, Landmark, ShieldCheck, FileCheck
} from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { getWhatsAppLink } from '../../lib/constants';

/* ============ SERVICE MENU ITEMS ============ */
const SERVICES_MENU = [
  {
    title: 'Startup India & DPIIT Recognition',
    desc: 'Official sovereign recognition unlocking priority government schemes and IPR rebates.',
    href: '/startup',
    icon: Rocket,
  },
  {
    title: 'Section 80-IAC Tax Exemption',
    desc: '100% tax holiday on corporate profits for 3 consecutive years via IMB board.',
    href: '/eligibility/80-iac',
    icon: Landmark,
  },
  {
    title: 'Startup India Seed Fund (SISFS)',
    desc: 'Grants up to ₹20 Lakhs for prototype validation and ₹50 Lakhs for market scaling.',
    href: '/schemes/startup-india-seed-fund',
    icon: Sparkles,
  },
  {
    title: 'MSME ZED & ISO Certifications',
    desc: 'Quality accreditations with up to 80% government subsidy and lower loan interest.',
    href: '/certifications',
    icon: Award,
  },
  {
    title: 'Company & LLP Incorporation',
    desc: 'Fast-track MCA incorporation, DIN, PAN, GST, and statutory bank setup.',
    href: '/services',
    icon: Building2,
  },
  {
    title: 'Credit Guarantees (CGSS / CGTMSE)',
    desc: 'Collateral-free debt facilities up to ₹10 Crore with sovereign risk coverage.',
    href: '/funding',
    icon: ShieldCheck,
  },
];

/* ============ SCHEMES MENU ITEMS ============ */
const SCHEMES_MENU = [
  {
    title: 'Startup India Seed Fund Scheme',
    desc: 'Early-stage prototype validation and commercialization grant.',
    href: '/schemes/startup-india-seed-fund',
    tag: 'DPIIT Grant',
  },
  {
    title: 'Section 80-IAC Corporate Tax Exemption',
    desc: '3 consecutive years 100% deduction on operational profits.',
    href: '/schemes/section-80-iac',
    tag: 'Tax Holiday',
  },
  {
    title: 'Credit Guarantee Scheme for Startups (CGSS)',
    desc: 'Collateral-free loans up to ₹10 Crore from scheduled banks.',
    href: '/schemes/cgss',
    tag: 'Debt Facility',
  },
  {
    title: 'PMEGP MSME Capital Subsidy',
    desc: 'Up to 35% margin money subsidy on project costs up to ₹50 Lakhs.',
    href: '/schemes/pmegp',
    tag: 'MSME Subsidy',
  },
  {
    title: 'BIRAC Biotechnology Ignition Grant (BIG)',
    desc: 'Up to ₹50 Lakhs non-dilutive grant for bio-innovators and MedTech.',
    href: '/schemes/birac-big',
    tag: 'Biotech Grant',
  },
  {
    title: 'Gujarat State Startup Scheme (i-Hub)',
    desc: 'Up to ₹30 Lakhs seed support + monthly founder sustenance allowance.',
    href: '/schemes/gujarat-startup-policy',
    tag: 'State Policy',
  },
];

export default function Header({ onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const headerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (onMenuToggle) onMenuToggle(open);
  }, [open, onMenuToggle]);

  /* SCROLL MONITOR */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Header entrance animation */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = headerRef.current;
    if (!el) return;
    gsap.fromTo(el, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (menu) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div
          className={`w-full transition-all duration-300 border-b ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md border-line shadow-[0_4px_25px_-5px_rgba(22,58,138,0.08)]'
              : 'bg-white/90 backdrop-blur-sm border-line/70'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div
              className={`flex items-center justify-between gap-6 transition-all duration-300 ${
                scrolled ? 'h-16' : 'h-20'
              }`}
            >
              {/* ============ BRAND LOGO ============ */}
              <div className="flex items-center gap-3 shrink-0">
                <Logo size={scrolled ? 'md' : 'lg'} />
              </div>

              {/* ============ DESKTOP NAVIGATION ============ */}
              <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
                {/* Services Dropdown Trigger */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('services')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded-xl transition-colors ${
                      location.pathname.startsWith('/services') || activeDropdown === 'services'
                        ? 'text-blue bg-blue/10'
                        : 'text-graphite hover:text-ink hover:bg-canvas'
                    }`}
                    aria-expanded={activeDropdown === 'services'}
                  >
                    <span>Services</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {activeDropdown === 'services' && (
                    <div className="absolute top-full left-0 mt-2 w-[580px] bg-white border border-line rounded-3xl p-5 shadow-[0_25px_50px_-15px_rgba(22,58,138,0.15)] animate-[dropdownFade_0.2s_ease-out]">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-line">
                        <span className="text-[10px] font-bold text-blue tracking-[0.2em] uppercase">
                          Corporate Advisory & Registrations
                        </span>
                        <Link to="/services" className="text-xs font-bold text-blue hover:text-deepblue flex items-center gap-1">
                          All Services <ArrowUpRight size={12} />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {SERVICES_MENU.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="p-3 rounded-2xl border border-transparent hover:border-line hover:bg-canvas transition-all group flex items-start gap-3"
                          >
                            <div className="w-8 h-8 rounded-xl bg-blue/10 flex items-center justify-center shrink-0 group-hover:bg-blue group-hover:text-white transition-colors">
                              <item.icon size={15} className="text-blue group-hover:text-white" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-ink group-hover:text-blue transition-colors">
                                {item.title}
                              </div>
                              <div className="text-[11px] text-muted line-clamp-1 mt-0.5">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Schemes Dropdown Trigger */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('schemes')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded-xl transition-colors ${
                      location.pathname.startsWith('/schemes') || activeDropdown === 'schemes'
                        ? 'text-blue bg-blue/10'
                        : 'text-graphite hover:text-ink hover:bg-canvas'
                    }`}
                    aria-expanded={activeDropdown === 'schemes'}
                  >
                    <span>Schemes</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'schemes' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {activeDropdown === 'schemes' && (
                    <div className="absolute top-full left-0 mt-2 w-[580px] bg-white border border-line rounded-3xl p-5 shadow-[0_25px_50px_-15px_rgba(22,58,138,0.15)] animate-[dropdownFade_0.2s_ease-out]">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-line">
                        <span className="text-[10px] font-bold text-blue tracking-[0.2em] uppercase">
                          Central & State Schemes Intelligence
                        </span>
                        <Link to="/schemes" className="text-xs font-bold text-blue hover:text-deepblue flex items-center gap-1">
                          Full 18+ Schemes Directory <ArrowUpRight size={12} />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {SCHEMES_MENU.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="p-3 rounded-2xl border border-transparent hover:border-line hover:bg-canvas transition-all group block"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-ink group-hover:text-blue transition-colors truncate">
                                {item.title}
                              </span>
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue/10 text-blue shrink-0">
                                {item.tag}
                              </span>
                            </div>
                            <div className="text-[11px] text-muted line-clamp-1">
                              {item.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  to="/startup"
                  className={`px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded-xl transition-colors ${
                    location.pathname === '/startup' ? 'text-blue bg-blue/10' : 'text-graphite hover:text-ink hover:bg-canvas'
                  }`}
                >
                  Startup India
                </Link>

                <Link
                  to="/eligibility/80-iac"
                  className={`px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded-xl transition-colors ${
                    location.pathname === '/eligibility/80-iac' ? 'text-blue bg-blue/10' : 'text-graphite hover:text-ink hover:bg-canvas'
                  }`}
                >
                  80-IAC Exemption
                </Link>

                <Link
                  to="/funding"
                  className={`px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded-xl transition-colors ${
                    location.pathname === '/funding' ? 'text-blue bg-blue/10' : 'text-graphite hover:text-ink hover:bg-canvas'
                  }`}
                >
                  Funding
                </Link>

                <Link
                  to="/certifications"
                  className={`px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded-xl transition-colors ${
                    location.pathname === '/certifications' ? 'text-blue bg-blue/10' : 'text-graphite hover:text-ink hover:bg-canvas'
                  }`}
                >
                  Certifications
                </Link>

                <Link
                  to="/about"
                  className={`px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded-xl transition-colors ${
                    location.pathname === '/about' ? 'text-blue bg-blue/10' : 'text-graphite hover:text-ink hover:bg-canvas'
                  }`}
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className={`px-3.5 py-2 text-[13px] font-semibold tracking-tight rounded-xl transition-colors ${
                    location.pathname === '/contact' ? 'text-blue bg-blue/10' : 'text-graphite hover:text-ink hover:bg-canvas'
                  }`}
                >
                  Contact
                </Link>
              </nav>

              {/* ============ DESKTOP CTAS ============ */}
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                {/* WhatsApp Desk */}
                <a
                  href={getWhatsAppLink('general enquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200"
                >
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                  </span>
                  <MessageCircle size={14} />
                  <span>WhatsApp Desk</span>
                </a>

                {/* Primary CTA */}
                <Link
                  to="/eligibility"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue hover:bg-deepblue text-white text-xs font-bold shadow-[0_8px_20px_-4px_rgba(28,131,243,0.4)] hover:shadow-[0_12px_24px_-4px_rgba(28,131,243,0.5)] transition-all duration-200"
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

      {/* ============ MOBILE DRAWER ============ */}
      <div
        className={`fixed inset-0 z-50 xl:hidden transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-line mb-6">
              <Logo size="md" />
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl border border-line bg-canvas text-graphite"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-1">
              {[
                { label: 'Home', path: '/' },
                { label: 'All Services', path: '/services' },
                { label: 'Schemes Directory', path: '/schemes' },
                { label: 'Startup India & DPIIT', path: '/startup' },
                { label: 'Section 80-IAC Exemption', path: '/eligibility/80-iac' },
                { label: 'Funding & Grants', path: '/funding' },
                { label: 'MSME & Udyam', path: '/msme' },
                { label: 'Certifications', path: '/certifications' },
                { label: 'About CertWinX', path: '/about' },
                { label: 'Contact Advisory Desk', path: '/contact' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-graphite hover:text-blue hover:bg-blue/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-line space-y-3">
            <Link
              to="/eligibility"
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue text-white text-xs font-bold"
            >
              <span>Check Eligibility</span>
              <ArrowUpRight size={14} />
            </Link>
            <a
              href={getWhatsAppLink('mobile menu')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Advisory Desk</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
