import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  ChevronRight,
  Home,
  Settings,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import { SITE, getWhatsAppLink } from '../../lib/constants';
import SplitTextReveal from '../motion/SplitTextReveal';
import { gsap } from '../../lib/gsap';

/* ============ NAVIGATION COLUMNS ============ */
const EXPLORE_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Success Stories', path: '/case-studies' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
];

const POPULAR_SERVICES = [
  { label: 'Startup India', path: '/startup' },
  { label: '80-IAC', path: '/services/section-80-iac' },
  { label: 'Govt. Grants', path: '/funding' },
  { label: 'Udyam Registration', path: '/msme' },
  { label: 'ISO Certification', path: '/certifications' },
  { label: 'View All Services', path: '/services' },
];

/* ============ SOCIALS — Brand colors ============ */
const SOCIALS = [
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/certwinx', label: 'LinkedIn', color: '#0A66C2' },
  { Icon: Instagram, href: 'https://www.instagram.com/certwinx', label: 'Instagram', color: '#E1306C' },
  { Icon: Facebook, href: 'https://www.facebook.com/certwinx', label: 'Facebook', color: '#1877F2' },
  { Icon: Youtube, href: 'https://www.youtube.com/@certwinx', label: 'YouTube', color: '#FF0000' },
  { Icon: Twitter, href: 'https://twitter.com/certwinx', label: 'X', color: '#000000' },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = footerRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Card reveal on scroll */
      gsap.from('[data-footer-card]', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 92%',
          once: true,
        },
      });

      /* Live dot pulse */
      gsap.to('[data-wa-dot]', {
        scale: 1.5,
        opacity: 0.4,
        duration: 1.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      /* Glow drift */
      gsap.utils.toArray('[data-footer-glow]').forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 === 0 ? '+=40' : '-=40',
          y: i % 2 === 0 ? '-=30' : '+=30',
          duration: 14 + i * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* ============ BACKGROUND — Dark Navy (Same as 80-IAC page) ============ */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0A0F1F]" />

        {/* Radial glows — blue + gold */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 20% 0%, rgba(22,131,255,0.15), transparent 60%), radial-gradient(ellipse 40% 50% at 90% 20%, rgba(22,131,255,0.12), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(204,171,110,0.08), transparent 60%)',
          }}
        />

        {/* Animated glow blobs */}
        <div
          data-footer-glow
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(22,131,255,0.15), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          data-footer-glow
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(204,171,110,0.1), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Subtle grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* ============ CTA STRIP ============ */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 sm:pt-14 lg:pt-16">
        <div className="pb-8 sm:pb-10">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-4">
            <span className="w-6 h-px bg-blue" />
            Let's Work Together
          </span>

          <SplitTextReveal
            as="h2"
            trigger="scroll"
            className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-[-0.03em] max-w-4xl"
          >
            Let's build something{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              that lasts.
            </span>
          </SplitTextReveal>

          <div className="mt-8 sm:mt-20 flex flex-wrap gap-4 sm:gap-5">
            <Link
              to="/eligibility"
              className="group inline-flex items-center gap-3 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-white text-[12px] sm:text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_25px_-8px_rgba(22,131,255,0.6)]"
              style={{
                background: 'linear-gradient(135deg, #1683FF 0%, #0A5FCC 100%)',
              }}
            >
              Check My Eligibility
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white/20 text-white text-[12px] sm:text-sm font-semibold hover:bg-white/5 hover:border-white/30 transition-colors duration-300"
            >
              <span className="relative shrink-0 flex items-center justify-center w-3 h-3">
                <span data-wa-dot className="absolute inset-0 rounded-full bg-green-400/60" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
              </span>
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ============ 4 CARDS GRID ============ */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">

          {/* ============ CARD 1: BRAND ============ */}
          <div
            data-footer-card
            className="sm:col-span-2 lg:col-span-1 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)] p-6 flex flex-col"
          >
            {/* Logo — Bigger + White */}
<div className="mb-6">
  <img
    src="/certwinx-logo.png"
    alt="CertWinX"
    style={{
      height: '100px',
      width: 'auto',
      filter: 'brightness(0) invert(1)',
    }}
    className="object-contain"
    draggable={false}
  />
</div>

            {/* Tagline */}
            <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.12em] text-white/70 uppercase leading-relaxed mb-1">
              Aapki Tarakki Ka Saathi,
            </p>
            <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.12em] text-white/70 uppercase leading-relaxed mb-4">
              Bharosa Aapka, Jimmedari Humari
            </p>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-amber-400 to-transparent rounded-full mb-5" />

            {/* Building Today Text */}
            <p className="font-display text-[15px] sm:text-base font-bold text-white leading-snug mb-5">
              Building Today
              <br />
              for a{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Better Tomorrow.
              </span>
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-auto">
              {SOCIALS.map(({ Icon, href, label, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  style={{ background: color }}
                >
                  <Icon size={14} fill="currentColor" strokeWidth={0} />
                </a>
              ))}
            </div>
          </div>

          {/* ============ CARD 2: EXPLORE ============ */}
          <FooterCard icon={Home} title="Explore" links={EXPLORE_LINKS} />

          {/* ============ CARD 3: POPULAR SERVICES ============ */}
          <FooterCard icon={Settings} title="Popular Services" links={POPULAR_SERVICES} />

          {/* ============ CARD 4: CONTACT ============ */}
          <div
            data-footer-card
            className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)] p-6"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/10">
              <span className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center">
                <Phone size={15} className="text-blue" />
              </span>
              <h4 className="font-display text-[15px] font-bold text-white">
                Contact Us
              </h4>
            </div>

            {/* Contact list */}
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-start gap-2.5 text-[13px] text-white/70 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-blue mt-0.5 shrink-0" />
                  <span className="font-medium">{SITE.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2.5 text-[13px] text-white/70 hover:text-white transition-colors break-all"
                >
                  <Mail size={14} className="text-blue mt-0.5 shrink-0" />
                  <span className="font-medium">{SITE.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-[13px] text-white/70">
                  <MapPin size={14} className="text-blue mt-0.5 shrink-0" />
                  <span className="font-medium leading-relaxed">
                    Ahmedabad, Gujarat
                    <br />
                    India - 380015
                  </span>
                </div>
              </li>
            </ul>

            {/* WhatsApp Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white text-[13px] font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_25px_-8px_rgba(22,131,255,0.6)]"
              style={{
                background: 'linear-gradient(135deg, #1683FF 0%, #0A5FCC 100%)',
              }}
            >
              <MessageCircle size={14} />
              Chat on WhatsApp
              <ChevronRight size={14} />
            </a>
          </div>
        </div>

        {/* ============ BOTTOM BAR ============ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-5 border-t border-white/10">
          {/* Copyright */}
          <p className="text-[11px] sm:text-[12px] text-white/45">
            © {new Date().getFullYear()} CertWinX. All Rights Reserved.
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-[11px] sm:text-[12px] text-white/45">
            <Link to="/privacy-policy" className="hover:text-blue transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/terms" className="hover:text-blue transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/sitemap" className="hover:text-blue transition-colors">
              Sitemap
            </Link>
          </div>

          {/* Right Tagline */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-[12px] text-white/60 font-semibold">
            <span>Innovate</span>
            <span className="text-white/20">|</span>
            <span>Comply</span>
            <span className="text-white/20">|</span>
            <span>Grow</span>
          </div>
        </div>
      </div>

      {/* Floating language switcher */}
      <button
        className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 text-white text-xs font-semibold hover:bg-white/10 transition-all"
        aria-label="Change language"
      >
        <span className="w-3 h-3 rounded-full border border-white/40 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-blue" />
        </span>
        English
      </button>
    </footer>
  );
}

/* ============ REUSABLE FOOTER CARD ============ */
function FooterCard({ icon: Icon, title, links }) {
  return (
    <div
      data-footer-card
      className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)] p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/10">
        <span className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center">
          <Icon size={15} className="text-blue" />
        </span>
        <h4 className="font-display text-[15px] font-bold text-white">
          {title}
        </h4>
      </div>

      {/* Links */}
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.path}
              className="group flex items-center justify-between py-1.5 text-[13px] text-white/70 hover:text-white transition-colors"
            >
              <span className="font-medium">{link.label}</span>
              <ChevronRight
                size={14}
                className="text-white/40 group-hover:text-blue group-hover:translate-x-0.5 transition-all shrink-0"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}