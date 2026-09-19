import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';
import { SITE, getWhatsAppLink } from '../../lib/constants';
import SplitTextReveal from '../motion/SplitTextReveal';
import { gsap } from '../../lib/gsap';

const COLUMNS = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Schemes', path: '/schemes' },
      { label: 'Contact', path: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Business Registration', path: '/services' },
      { label: 'Startup India / DPIIT', path: '/startup' },
      { label: 'Section 80-IAC', path: '/services/section-80-iac' },
      { label: 'Udyam / MSME', path: '/msme' },
      { label: 'ISO Certification', path: '/certifications' },
    ],
  },
  {
    title: 'Consultancy',
    links: [
      { label: 'Government Funding', path: '/funding' },
      { label: 'Eligibility Checker', path: '/eligibility' },
      { label: 'Book Consultation', path: '/consultation' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Resources', path: '/resources' },
    ],
  },
];

/* ============ SOCIAL LINKS — UPDATE WITH REAL URLs ============ */
const SOCIALS = [
  {
    Icon: Instagram,
    href: 'https://www.instagram.com/certwinx',
    label: 'Instagram',
    color: '#E1306C',
  },
  {
    Icon: Linkedin,
    href: 'https://www.linkedin.com/company/certwinx',
    label: 'LinkedIn',
    color: '#0A66C2',
  },
  {
    Icon: Facebook,
    href: 'https://www.facebook.com/certwinx',
    label: 'Facebook',
    color: '#1877F2',
  },
  {
    Icon: Twitter,
    href: 'https://twitter.com/certwinx',
    label: 'Twitter',
    color: '#1DA1F2',
  },
];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = footerRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.to('[data-footer-glow]', {
        x: '+=40',
        y: '-=30',
        duration: 12,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray('[data-footer-particle]').forEach((p, i) => {
        gsap.to(p, {
          y: () => gsap.utils.random(-40, 40),
          x: () => gsap.utils.random(-30, 30),
          opacity: () => gsap.utils.random(0.1, 0.4),
          duration: 6 + i * 0.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      gsap.to('[data-wa-dot]', {
        scale: 1.6,
        opacity: 0.3,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.from('[data-footer-col]', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          once: true,
        },
      });

      // Tagline shimmer
      gsap.to('[data-tagline-shimmer]', {
        backgroundPosition: '200% 0',
        duration: 5,
        ease: 'none',
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #0A1F40 0%, #102A56 30%, #1A3D73 60%, #0F1E3D 100%)',
      }}
    >
      {/* Radial color overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(204, 171, 110, 0.25), transparent 60%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(22, 131, 255, 0.3), transparent 60%)',
        }}
      />

      {/* Animated glow blobs */}
      <div
        data-footer-glow
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204, 171, 110, 0.15), transparent 70%)' }}
      />
      <div
        data-footer-glow
        className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(22, 131, 255, 0.2), transparent 70%)' }}
      />

      {/* Floating particles */}
      {[
        { top: '15%', left: '8%' },
        { top: '30%', left: '92%' },
        { top: '50%', left: '5%' },
        { top: '70%', left: '95%' },
        { top: '85%', left: '12%' },
        { top: '25%', left: '50%' },
        { top: '60%', left: '75%' },
      ].map((p, i) => (
        <span
          key={i}
          data-footer-particle
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: i % 2 === 0 ? 3 : 2,
            height: i % 2 === 0 ? 3 : 2,
            background: i % 3 === 0 ? '#CCAB6E' : '#1683FF',
            boxShadow: `0 0 ${i % 2 === 0 ? 12 : 8}px ${i % 3 === 0 ? '#CCAB6E' : '#1683FF'}88`,
          }}
        />
      ))}

      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>

      {/* ============ CTA STRIP ============ */}
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 pt-16 lg:pt-20">
        <div className="pb-12 lg:pb-16 border-b border-white/10">
          <SplitTextReveal
            as="h2"
            trigger="scroll"
            className="font-display text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] font-bold text-white leading-[1.1] tracking-[-0.02em] max-w-3xl"
            style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)' }}
          >
            Let's build something that lasts.
          </SplitTextReveal>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/eligibility"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-ink text-sm font-semibold hover:bg-gold transition-colors duration-300"
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
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors duration-300"
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

      {/* ============ MAIN FOOTER ============ */}
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* ============ BRAND COLUMN ============ */}
          <div data-footer-col className="lg:col-span-2">

            {/* Logo — premium with glow */}
            <div className="relative mb-6 inline-block">
              <div
                className="absolute -inset-3 rounded-full opacity-60 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(45,156,255,0.4), transparent 70%)',
                  filter: 'blur(20px)',
                }}
                aria-hidden="true"
              />
              <img
                src="/certwinx-logo.png"
                alt="CertWinX Private Limited"
                style={{ height: '64px', width: 'auto', filter: 'brightness(0) invert(1)' }}
                className="relative object-contain drop-shadow-[0_0_20px_rgba(45,156,255,0.3)]"
                draggable={false}
              />
            </div>

            {/* Tagline — PREMIUM HIGHLIGHTED */}
            <div className="mb-8 max-w-sm">
              {/* Line 1 — Gold gradient shimmer */}
              <p
                data-tagline-shimmer
                className="font-display text-lg lg:text-xl font-bold leading-tight mb-2"
                style={{
                  background:
                    'linear-gradient(90deg, #FFFFFF 0%, #F6E9C9 25%, #CCAB6E 50%, #F6E9C9 75%, #FFFFFF 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(204,171,110,0.2)',
                }}
              >
                {SITE.tagline}
              </p>

              {/* Line 2 — Soft blue italic */}
              <p
                className="text-sm lg:text-base italic tracking-wide text-blue-200/90"
                style={{ textShadow: '0 0 20px rgba(45,156,255,0.2)' }}
              >
                {SITE.tagline2}
              </p>
            </div>

            {/* Social icons — premium with brand colors */}
            <div className="flex items-center gap-3 mb-8">
              {SOCIALS.map(({ Icon, href, label, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative w-10 h-10 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center text-white/80 transition-all duration-500 hover:scale-110 hover:-translate-y-0.5"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = color;
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.boxShadow = `0 0 25px ${color}88, 0 10px 20px -10px ${color}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>

            {/* ============ CONTACT LIST — PREMIUM ANIMATED ============ */}
            <ul className="space-y-3 text-[14px]">

              {/* PHONE — pulse + blue glow */}
              <li data-contact-row>
                <a
                  href={`tel:${SITE.phone}`}
                  className="contact-row group flex items-start gap-3 text-white/85 hover:text-white transition-colors duration-300"
                >
                  <span className="relative shrink-0 w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 group-hover:bg-gradient-to-br group-hover:from-blue group-hover:to-deepblue group-hover:border-blue flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(45,156,255,0.5)]">
                    <Phone size={15} className="text-white/90 transition-transform duration-500 group-hover:scale-110" />
                    <span className="absolute inset-0 rounded-xl border border-blue/0 group-hover:border-blue/40 group-hover:animate-ping" />
                  </span>
                  <span className="pt-2.5 font-medium tracking-wide">
                    <span className="phone-number inline-block">{SITE.phone}</span>
                  </span>
                </a>
              </li>

              {/* WHATSAPP — live typing dots */}
              <li data-contact-row>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-row group flex items-start gap-3 text-white/85 hover:text-white transition-colors duration-300"
                >
                  <span className="relative shrink-0 w-10 h-10 rounded-xl bg-green-500/10 border border-green-400/25 group-hover:bg-green-500 group-hover:border-green-400 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]">
                    <MessageCircle size={15} className="text-green-400 group-hover:text-white transition-colors" />
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-3 h-3">
                      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping" />
                      <span className="relative w-2 h-2 rounded-full bg-green-400 border border-[#0A1F40]" />
                    </span>
                  </span>
                  <span className="pt-2.5 font-medium tracking-wide flex items-center gap-2">
                    <span>WhatsApp Us</span>
                    <span className="inline-flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <span className="typing-dot" style={{ animationDelay: '0s' }}>·</span>
                      <span className="typing-dot" style={{ animationDelay: '0.2s' }}>·</span>
                      <span className="typing-dot" style={{ animationDelay: '0.4s' }}>·</span>
                    </span>
                  </span>
                </a>
              </li>

              {/* EMAIL — gold shimmer */}
              <li data-contact-row>
                <a
                  href={`mailto:${SITE.email}`}
                  className="contact-row group flex items-start gap-3 text-white/85 hover:text-white transition-colors duration-300"
                >
                  <span className="relative shrink-0 w-10 h-10 rounded-xl bg-gold/10 border border-gold/25 group-hover:bg-gold group-hover:border-gold flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(204,171,110,0.5)]">
                    <Mail size={15} className="text-gold group-hover:text-ink transition-colors" />
                  </span>
                  <span className="pt-2.5 font-medium break-all">
                    <span className="email-shimmer inline-block">{SITE.email}</span>
                  </span>
                </a>
              </li>

              {/* ADDRESS */}
              <li data-contact-row>
                <div className="contact-row group flex items-start gap-3 text-white/75">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 group-hover:bg-white group-hover:border-white flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    <MapPin size={15} className="text-white/80 group-hover:text-blue transition-colors" />
                  </span>
                  <span className="pt-2.5 leading-relaxed max-w-xs text-[13px]">
                    {SITE.address}
                  </span>
                </div>
              </li>

              {/* HOURS — clock rotates */}
              <li data-contact-row>
                <div className="contact-row group flex items-start gap-3 text-white/75">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 group-hover:bg-gold/15 group-hover:border-gold/30 flex items-center justify-center transition-all duration-500">
                    <Clock
                      size={15}
                      className="text-white/80 group-hover:text-gold transition-all duration-700 group-hover:rotate-[360deg]"
                    />
                  </span>
                  <span className="pt-2.5 text-[13px]">{SITE.hours}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* ============ LINK COLUMNS ============ */}
          {COLUMNS.map((col) => (
            <div key={col.title} data-footer-col>
              <h4 className="flex items-center gap-2.5 mb-6">
                <span
                  className="w-5 h-[2px] rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #CCAB6E, rgba(204,171,110,0.3))',
                  }}
                />
                <span className="text-[13px] lg:text-[14px] font-bold tracking-[0.2em] uppercase text-white">
                  {col.title}
                </span>
              </h4>

                         <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.path}
                      className="group relative flex items-center gap-2 px-3 py-2 -mx-3 rounded-lg text-[15px] font-medium text-white/85 hover:text-ink transition-all duration-300 overflow-hidden"
                    >
                      {/* Sliding white background */}
                      <span className="absolute inset-0 rounded-lg bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                      {/* Animated dash — blue on hover */}
                      <span className="relative w-0 h-px bg-blue group-hover:w-3 transition-all duration-300 z-10" />

                      {/* Label — ink on hover */}
                      <span className="relative z-10 text-white/85 group-hover:text-ink group-hover:translate-x-0.5 transition-all duration-300">
                        {l.label}
                      </span>

                      {/* Arrow — blue, slides in on hover */}
                      <ArrowUpRight
                        size={11}
                        className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-blue"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ============ BOTTOM LEGAL STRIP ============ */}
        <div className="pt-8">
          <p className="text-[12px] text-white/45 leading-relaxed max-w-4xl">
            <strong className="text-white/70 font-semibold">Disclaimer:</strong> CertWinX provides
            professional assistance and consultancy services. Government registrations,
            certifications, approvals, grants, funding, tax benefits and scheme benefits are subject
            to applicable eligibility criteria, documentation, government rules and decisions of the
            relevant authorities. Information provided on this website is for general informational
            purposes and may change.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
            {[
              { label: 'Privacy Policy', path: '/privacy-policy' },
              { label: 'Terms', path: '/terms' },
              { label: 'Refund Policy', path: '/refund-policy' },
              { label: 'Disclaimer', path: '/disclaimer' },
              { label: 'Cookie Policy', path: '/cookie-policy' },
            ].map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="text-[12px] font-medium text-white/50 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <span className="text-[12px] text-white/40 ml-auto">
              © {new Date().getFullYear()} CertWinX Private Limited. All rights reserved.
            </span>
          </div>
        </div>
      </div>

      {/* Floating language switcher */}
      <button
        className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition-all"
        aria-label="Change language"
      >
        <span className="w-3 h-3 rounded-full border border-white/40 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
        </span>
        English
      </button>

      {/* ============ CUSTOM ANIMATIONS ============ */}
      <style>{`
        /* Contact rows slide right on hover */
        .contact-row {
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .contact-row:hover {
          transform: translateX(4px);
        }

        /* Phone number — subtle pulse glow */
        @keyframes phonePulse {
          0%, 100% {
            text-shadow: 0 0 0 rgba(45,156,255,0);
          }
          50% {
            text-shadow: 0 0 12px rgba(45,156,255,0.5);
          }
        }
        .phone-number {
          animation: phonePulse 3s ease-in-out infinite;
        }

        /* WhatsApp typing dots */
        @keyframes typingDot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-3px);
            opacity: 1;
          }
        }
        .typing-dot {
          display: inline-block;
          font-size: 20px;
          line-height: 0.6;
          color: #4ADE80;
          animation: typingDot 1.4s infinite;
        }

        /* Email gold shimmer */
        @keyframes emailShimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .email-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(204, 171, 110, 1) 25%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(204, 171, 110, 1) 75%,
            rgba(255, 255, 255, 0.9) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: emailShimmer 4s linear infinite;
        }
      `}</style>
    </footer>
  );
}