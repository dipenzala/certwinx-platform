import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Award,
  ShieldCheck,
  Building2,
  Globe,
  Leaf,
  FileCheck,
  BadgeCheck,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { gsap } from '../lib/gsap';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { SERVICES } from '../data/services';
import { getWhatsAppLink } from '../lib/constants';

/* ============ CERTIFICATIONS DATA ============ */
const CERT_SLUGS = [
  'iso-certification',
  'zed-certification',
  'nsic-spr',
  'duns-drs-plus',
  'fssai-registration',
  'iec-code',
  'udyam-msme',
  'gem-registration',
];

/* ============ CARD META ============ */
const CARD_META = {
  'iso-certification': { icon: Award, tone: 'blue', tagline: 'Quality Management' },
  'zed-certification': { icon: Leaf, tone: 'blue', tagline: 'Zero Defect · Zero Effect' },
  'nsic-spr': { icon: FileCheck, tone: 'blue', tagline: 'Single Point Registration' },
  'duns-drs-plus': { icon: Database, tone: 'blue', tagline: 'Global Business Identity' },
  'fssai-registration': { icon: ShieldCheck, tone: 'blue', tagline: 'Food Safety License' },
  'iec-code': { icon: Globe, tone: 'blue', tagline: 'Import Export Code' },
  'udyam-msme': { icon: Building2, tone: 'blue', tagline: 'MSME Registration' },
  'gem-registration': { icon: BadgeCheck, tone: 'blue', tagline: 'Government e-Marketplace' },
};

/* ============ HERO STATS ============ */
const HERO_STATS = [
  { value: '8+', label: 'Certifications' },
  { value: '15-30', label: 'Days Timeline' },
  { value: '100%', label: 'Assistance' },
  { value: 'Pan-India', label: 'Coverage' },
];

/* ============ BENEFITS ============ */
const BENEFITS = [
  { icon: ShieldCheck, title: 'Enhanced Credibility', desc: 'Certifications build trust with clients and partners.' },
  { icon: Globe, title: 'Market Access', desc: 'Unlock government tenders and international markets.' },
  { icon: BadgeCheck, title: 'Regulatory Compliance', desc: 'Stay compliant with statutory requirements.' },
  { icon: Award, title: 'Competitive Advantage', desc: 'Stand out in your industry with verified credentials.' },
];

export default function Certifications() {
  const rootRef = useRef(null);

  const certifications = SERVICES.filter((s) => CERT_SLUGS.includes(s.slug));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-glow]').forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 === 0 ? '+=40' : '-=40',
          y: i % 2 === 0 ? '-=30' : '+=30',
          duration: 12 + i * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      gsap.to('[data-grid-shimmer]', {
        backgroundPosition: '200% 0',
        duration: 10,
        ease: 'none',
        repeat: -1,
      });

      gsap.to('[data-live-dot]', {
        scale: 1.6,
        opacity: 0.4,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.utils.toArray('[data-particle]').forEach((p, i) => {
        gsap.to(p, {
          y: () => gsap.utils.random(-25, 25),
          x: () => gsap.utils.random(-20, 20),
          opacity: () => gsap.utils.random(0.2, 0.6),
          duration: 6 + i * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Certifications — CertWinX</title>
        <meta
          name="description"
          content="Professional assistance for ISO, ZED, NSIC, DUNS, FSSAI, IEC, Udyam and GeM certifications in India."
        />
      </Helmet>

      {/* ============ HERO ============ */}
      <section
        ref={rootRef}
        className="relative pt-36 lg:pt-44 pb-16 lg:pb-20 bg-[#0A0F1F] text-white overflow-hidden"
      >
        {/* Grid shimmer */}
        <div
          data-grid-shimmer
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(22,131,255,0.3) 50%, transparent 100%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '200% 100%, 64px 64px, 64px 64px',
          }}
        />

        {/* Glow blobs */}
        <div
          data-glow
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue/15 blur-[120px] pointer-events-none"
        />
        <div
          data-glow
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[100px] pointer-events-none"
        />

        {/* Particles */}
        {[
          { top: '20%', left: '8%', size: 3 },
          { top: '35%', left: '92%', size: 2 },
          { top: '60%', left: '5%', size: 2 },
          { top: '80%', left: '88%', size: 3 },
          { top: '25%', left: '50%', size: 2 },
        ].map((p, i) => (
          <span
            key={i}
            data-particle
            className="absolute rounded-full bg-blue pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              boxShadow: `0 0 ${p.size * 4}px rgba(22,131,255,0.6)`,
            }}
          />
        ))}

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">

            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-6">
                <span className="relative flex items-center justify-center w-2.5 h-2.5">
                  <span data-live-dot className="absolute inset-0 rounded-full bg-green-400/60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
                </span>
                Government Certifications
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance mb-6">
                Certifications & registrations for{' '}
                <span className="text-blue">Indian businesses.</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                Professional assistance for ISO, ZED, NSIC, DUNS, FSSAI, IEC, Udyam and GeM —
                end-to-end documentation, application and coordination.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton to="/eligibility" variant="primary" size="lg">
                  Check Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
                <MagneticButton to="/contact" variant="outline" size="lg">
                  Talk to Expert
                </MagneticButton>
              </div>
            </RevealOnScroll>

            {/* Stats strip */}
            <RevealOnScroll delay={0.4}>
              <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                {HERO_STATS.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-display text-xl font-bold text-white tabular">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">
                      {s.label}
                    </span>
                    {i < HERO_STATS.length - 1 && (
                      <span className="w-px h-4 bg-white/15 ml-4 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS STRIP ============ */}
      <section className="relative py-14 lg:py-16 bg-[#0A0F1F] border-t border-blue/15">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <RevealOnScroll key={i} delay={i * 0.06}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue/15 border border-blue/30 flex items-center justify-center shrink-0">
                    <b.icon size={16} className="text-blue" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-white mb-1">
                      {b.title}
                    </p>
                    <p className="text-xs text-white/55 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATIONS GRID ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas overflow-hidden">

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue/4 blur-[100px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">

          <RevealOnScroll>
            <div className="mb-12 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                <span className="w-6 h-px bg-blue" />
                All Certifications
              </span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                Choose the certification that fits your business.
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                Each certification opens specific doors — government tenders, exports, food
                licensing, MSME benefits and more.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {certifications.map((c, i) => (
              <CertificationCard key={c.slug} cert={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CERTIFICATIONS MATTER ============ */}
      <section className="relative py-16 lg:py-20 bg-paper border-y border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            <div className="lg:col-span-6">
              <RevealOnScroll>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-4">
                  <span className="w-6 h-px bg-blue" />
                  Why Certifications Matter
                </span>
                <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-6">
                  Verified credentials open doors that stay closed otherwise.
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <ul className="space-y-4">
                  {[
                    'Government tenders often require specific certifications',
                    'International trade needs ISO, IEC and DUNS credentials',
                    'MSME benefits are tied to Udyam and ZED registrations',
                    'Food businesses require FSSAI license to operate legally',
                    'GeM registration enables direct government sales',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-blue mt-0.5 shrink-0" />
                      <span className="text-sm lg:text-base text-graphite leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-6">
              <RevealOnScroll delay={0.2}>
                <div className="bg-[#0A0F1F] rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                  <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue/25 blur-[80px]" />
                  <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue/15 blur-[80px]" />

                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-blue/15 border border-blue/30 flex items-center justify-center mb-6">
                      <Sparkles size={20} className="text-blue" />
                    </div>
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-white leading-tight mb-4">
                      Not sure which certification you need?
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-7">
                      Our team will help identify the right certifications for your industry,
                      business model and growth goals.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <MagneticButton to="/consultation" variant="primary" size="md">
                        Book Consultation <ArrowUpRight size={14} />
                      </MagneticButton>
                      <MagneticButton href={getWhatsAppLink('certifications')} variant="whatsapp" size="md">
                        WhatsApp
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA STRIP ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="bg-white border border-line rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue/10 blur-[80px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue/8 blur-[80px]" />

              <div className="relative">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-3">
                  Ready to get certified?
                </h3>
                <p className="text-base text-graphite mb-7 max-w-xl mx-auto">
                  Start with a quick eligibility check and let our team guide you through the
                  process.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <MagneticButton to="/eligibility" variant="primary" size="lg">
                    Check Eligibility <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton to="/contact" variant="outline" size="lg">
                    Contact Us
                  </MagneticButton>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

/* ============ CERTIFICATION CARD ============ */
function CertificationCard({ cert, index }) {
  const cardRef = useRef(null);
  const meta = CARD_META[cert.slug] || { icon: Award, tagline: 'Certification' };
  const Icon = meta.icon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const setRotX = gsap.quickTo(card, 'rotateX', { duration: 0.6, ease: 'power3.out' });
    const setRotY = gsap.quickTo(card, 'rotateY', { duration: 0.6, ease: 'power3.out' });
    gsap.set(card, { transformPerspective: 1000 });

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setRotY(px * 6);
      setRotX(-py * 5);
    };
    const onLeave = () => {
      setRotX(0);
      setRotY(0);
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

    return (
    <Link
      to={`/services/${cert.slug}`}
      className="group block h-full will-change-transform"
    >
      <div
        ref={cardRef}
        className="relative h-full rounded-3xl p-6 overflow-hidden transition-all duration-500 will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          background: '#0F172A',
          boxShadow: '0 20px 40px -20px rgba(15, 23, 42, 0.35)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#FFFFFF';
          e.currentTarget.style.boxShadow = '0 30px 60px -20px rgba(23,105,255,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#0F172A';
          e.currentTarget.style.boxShadow = '0 20px 40px -20px rgba(15, 23, 42, 0.35)';
        }}
      >
        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06] group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`cert-grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#cert-grid-${index})`} />
        </svg>

        <div className="relative">

          {/* Icon + arrow row */}
          <div className="flex items-start justify-between mb-7">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:bg-blue group-hover:border-blue group-hover:scale-110">
              <Icon
                size={20}
                className="text-white transition-colors duration-500"
                strokeWidth={2.2}
              />
            </div>
            <span className="shrink-0 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-all duration-500 group-hover:rotate-45">
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </span>
          </div>

          {/* Tagline */}
          <p className="text-[10px] font-bold tracking-[0.15em] text-blue uppercase mb-2">
            {meta.tagline}
          </p>

          {/* Title */}
          <h3 className="font-display text-lg font-bold leading-tight mb-3 text-white group-hover:text-ink transition-colors duration-500">
            {cert.name}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed line-clamp-3 mb-6 text-white/60 group-hover:text-graphite transition-colors duration-500">
            {cert.short}
          </p>

          {/* Bottom hint */}
          <div className="pt-5 border-t border-white/10 group-hover:border-line transition-colors duration-500 flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/50 group-hover:text-blue transition-colors">
              View Details
            </span>
            <ArrowUpRight
              size={12}
              className="text-white/50 group-hover:text-blue transition-all duration-500"
            />
          </div>
        </div>

        {/* Bottom accent line */}
        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue to-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>
    </Link>
  );
}
