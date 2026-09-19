import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Target,
  Eye,
  Heart,
  Users,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Award,
  Layers,
  Building2,
  Rocket,
  Landmark,
  BadgeCheck,
  Handshake,
  FileCheck,
} from 'lucide-react';
import { gsap } from '../lib/gsap';
import MagneticButton from '../components/motion/MagneticButton';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import SectionHeading from '../components/ui/SectionHeading';
import { getWhatsAppLink } from '../lib/constants';

/* ============ STATS ============ */
const STATS = [
  { value: '250+', label: 'Services Offered' },
  { value: '160+', label: 'Schemes Mapped' },
  { value: '8,927+', label: 'Clients Served' },
  { value: '99%', label: 'Success Ratio' },
];

/* ============ VALUES ============ */
const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Transparency',
    desc: 'Clear communication about processes, timelines, and what we can and cannot do.',
  },
  {
    icon: Users,
    title: 'Professionalism',
    desc: 'Structured, respectful engagement with every business we assist.',
  },
  {
    icon: Target,
    title: 'Accuracy',
    desc: 'Careful assessment and documentation to reduce avoidable errors.',
  },
  {
    icon: Heart,
    title: 'Genuine Assistance',
    desc: 'We help where we can, and are honest when something is outside our scope.',
  },
];

/* ============ WHAT WE COVER ============ */
const COVERAGE = [
  { icon: Building2, label: 'Business Registration', path: '/services' },
  { icon: Rocket, label: 'Startup India / DPIIT', path: '/startup' },
  { icon: Landmark, label: 'Government Schemes', path: '/schemes' },
  { icon: BadgeCheck, label: 'Certifications', path: '/certifications' },
  { icon: TrendingUp, label: 'Government Funding', path: '/funding' },
  { icon: FileCheck, label: 'Business Compliance', path: '/services' },
];

/* ============ WHY CHOOSE US ============ */
const WHY = [
  { num: '01', title: 'Structured Process', desc: 'Every engagement follows a clear, 7-step process.' },
  { num: '02', title: 'Pan-India Coverage', desc: 'Scheme knowledge across all 28+ states.' },
  { num: '03', title: 'Multi-Sector Experience', desc: 'Manufacturing, services, tech, retail and more.' },
  { num: '04', title: 'Transparent Terms', desc: 'No hidden costs. Clear scope from day one.' },
];

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Background glow drift
      gsap.to('[data-glow]', {
        x: '+=40',
        y: '-=30',
        duration: 12,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Grid shimmer
      gsap.to('[data-grid-shimmer]', {
        backgroundPosition: '200% 0',
        duration: 10,
        ease: 'none',
        repeat: -1,
      });

      // Live dot pulse
      gsap.to('[data-live-dot]', {
        scale: 1.6,
        opacity: 0.4,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Floating particles
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
        <title>About — CertWinX</title>
        <meta
          name="description"
          content="CertWinX Private Limited — a premium assistance platform helping Indian startups, MSMEs and entrepreneurs access registrations, certifications, government schemes, funding and compliance."
        />
      </Helmet>

      {/* ============ HERO — NAVY ============ */}
      <section
        ref={rootRef}
        className="relative pt-36 lg:pt-44 pb-20 lg:pb-28 bg-[#0A0F1F] text-white overflow-hidden"
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

        {/* Floating particles */}
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
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* LEFT — Content */}
            <div className="lg:col-span-7">

              {/* Badge */}
              <RevealOnScroll>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-7">
                  <span className="relative flex items-center justify-center w-2.5 h-2.5">
                    <span data-live-dot className="absolute inset-0 rounded-full bg-green-400/60" />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
                  </span>
                  About CertWinX · Established in India
                </span>
              </RevealOnScroll>

              {/* Heading */}
              <RevealOnScroll delay={0.1}>
                <h1 className="font-display text-[2rem] sm:text-[3rem] lg:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance mb-8">
                  A premium assistance platform for{' '}
                  <span className="text-blue">Indian businesses.</span>
                </h1>
              </RevealOnScroll>

              {/* Subtext */}
              <RevealOnScroll delay={0.2}>
                <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
                  CertWinX Private Limited helps Indian startups, MSMEs and entrepreneurs navigate
                  registrations, certifications, government schemes, funding and compliance — with
                  structure, clarity and genuine assistance.
                </p>
              </RevealOnScroll>

              {/* CTAs */}
              <RevealOnScroll delay={0.3}>
                <div className="flex flex-wrap items-center gap-3">
                  <MagneticButton to="/eligibility" variant="primary" size="lg">
                    Check My Eligibility <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton to="/consultation" variant="outline" size="lg">
                    Talk to an Expert
                  </MagneticButton>
                </div>
              </RevealOnScroll>

              {/* Micro stats row */}
              <RevealOnScroll delay={0.4}>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-blue shrink-0" />
                    <span className="text-xs text-white/70">Transparent process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-blue shrink-0" />
                    <span className="text-xs text-white/70">Recognised frameworks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Handshake size={14} className="text-blue shrink-0" />
                    <span className="text-xs text-white/70">No advance professional fees*</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* RIGHT — Mission / Vision cards */}
            <div className="lg:col-span-5">
              <RevealOnScroll delay={0.3}>
                <div className="space-y-5">

                  {/* Mission card */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-sm hover:bg-white/8 transition-colors duration-500">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue/15 border border-blue/30 flex items-center justify-center shrink-0">
                        <Target size={20} className="text-blue" strokeWidth={2.2} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-1">
                          Our Mission
                        </p>
                        <h3 className="font-display text-lg font-bold text-white leading-tight">
                          Make assistance accessible
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      To make professional business assistance accessible, transparent and
                      structured for startups, MSMEs and entrepreneurs across India — so they
                      can focus on growing their business with confidence.
                    </p>
                  </div>

                  {/* Vision card */}
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-sm hover:bg-white/8 transition-colors duration-500">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue/15 border border-blue/30 flex items-center justify-center shrink-0">
                        <Eye size={20} className="text-blue" strokeWidth={2.2} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-1">
                          Our Vision
                        </p>
                        <h3 className="font-display text-lg font-bold text-white leading-tight">
                          Be the trusted partner
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      To be a trusted partner for Indian businesses in accessing opportunities,
                      benefits and professional guidance — with clear communication and
                      genuine assistance at every step.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <section className="relative py-16 lg:py-20 bg-[#0A0F1F] border-t border-blue/15 overflow-hidden">
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {STATS.map((s, i) => (
              <RevealOnScroll key={i} delay={i * 0.08} className="text-center">
                <p className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold tabular leading-none text-white mb-3">
                  {s.value}
                </p>
                <p className="text-[10px] lg:text-[11px] font-bold tracking-[0.2em] text-blue uppercase">
                  {s.label}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="relative py-20 lg:py-28 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Core Values"
            title="The principles behind the work."
            subtitle="Every engagement is grounded in four principles that shape how we work."
            align="center"
          />

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <RevealOnScroll key={v.title} delay={i * 0.08}>
                <div className="group h-full bg-white border border-line rounded-3xl p-7 hover:border-blue/30 hover:shadow-[0_25px_50px_-20px_rgba(23,105,255,0.25)] hover:-translate-y-1 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-blue/8 border border-blue/20 flex items-center justify-center mb-5 group-hover:bg-blue group-hover:border-blue transition-all duration-500">
                    <v.icon
                      size={20}
                      className="text-blue group-hover:text-white transition-colors duration-500"
                      strokeWidth={2.2}
                    />
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink mb-2 group-hover:text-blue transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-sm text-graphite leading-relaxed">{v.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT WE COVER ============ */}
      <section className="relative py-20 lg:py-28 bg-paper border-y border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="What We Cover"
            title="Services across the business lifecycle."
            subtitle="From registration to growth — one partner for every stage."
            align="center"
          />

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COVERAGE.map((c, i) => (
              <RevealOnScroll key={c.label} delay={i * 0.06}>
                <Link
                  to={c.path}
                  className="group flex items-center justify-between bg-white border border-line rounded-2xl p-5 hover:border-blue/40 hover:bg-blue/3 hover:shadow-[0_15px_30px_-15px_rgba(23,105,255,0.25)] transition-all duration-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue/8 border border-blue/20 flex items-center justify-center group-hover:bg-blue group-hover:border-blue transition-all duration-500">
                      <c.icon
                        size={18}
                        className="text-blue group-hover:text-white transition-colors duration-500"
                        strokeWidth={2.2}
                      />
                    </div>
                    <span className="font-display text-base font-bold text-ink group-hover:text-blue transition-colors">
                      {c.label}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted group-hover:text-blue transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="relative py-20 lg:py-28 bg-[#0A0F1F] text-white overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue/12 blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="max-w-2xl mb-14">
              <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-4">
                Why CertWinX
              </span>
              <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold leading-[1.05] tracking-[-0.02em] text-white text-balance">
                Structured assistance. <span className="text-blue">Genuine engagement.</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map((w, i) => (
              <RevealOnScroll key={i} delay={i * 0.08}>
                <div className="group h-full bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/8 hover:border-blue/30 transition-all duration-500">
                  <p className="font-display text-4xl font-bold text-white/15 group-hover:text-blue/40 transition-colors tabular mb-5">
                    {w.num}
                  </p>
                  <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-blue transition-colors">
                    {w.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{w.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-20 lg:py-28 bg-canvas overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue/8 blur-[120px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-line text-[10px] font-bold tracking-[0.2em] text-ink/70 uppercase mb-6">
              <Sparkles size={11} className="text-blue" />
              Ready to get started?
            </span>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-bold text-ink leading-[1.05] tracking-[-0.02em] text-balance max-w-3xl mx-auto mb-6">
              Let's explore what may fit your business.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-base lg:text-lg text-graphite leading-relaxed max-w-2xl mx-auto mb-9">
              Start with a quick eligibility check or speak directly with our team.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="flex flex-wrap gap-3 justify-center">
              <MagneticButton to="/eligibility" variant="primary" size="lg">
                Check My Eligibility <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton to="/consultation" variant="outline" size="lg">
                Talk to an Expert
              </MagneticButton>
              <MagneticButton href={getWhatsAppLink()} variant="whatsapp" size="lg">
                WhatsApp Us
              </MagneticButton>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}