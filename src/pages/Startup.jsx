import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Sparkles,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Award,
  Landmark,
  FileCheck,
  BadgeCheck,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Percent,
  Calendar,
  Users,
  Briefcase,
} from 'lucide-react';
import { gsap } from '../lib/gsap';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import { SERVICES } from '../data/services';
import { getWhatsAppLink } from '../lib/constants';

/* ============ HERO STATS ============ */
const HERO_STATS = [
  { value: '10 Yrs', label: 'Max Startup Age' },
  { value: '₹200Cr', label: 'Max Turnover' },
  { value: '3 Yrs', label: 'Tax Holiday' },
  { value: '100%', label: 'Assistance' },
];

/* ============ SUPPORT AREAS ============ */
const AREAS = [
  {
    icon: Rocket,
    title: 'Startup India',
    desc: 'Recognition and benefits under the Startup India initiative.',
  },
  {
    icon: ShieldCheck,
    title: 'DPIIT Recognition',
    desc: 'Recognition that opens access to tax benefits and schemes.',
  },
  {
    icon: Percent,
    title: 'Section 80-IAC',
    desc: 'Tax holiday assistance for eligible DPIIT-recognised startups.',
  },
  {
    icon: TrendingUp,
    title: 'Seed Fund',
    desc: 'Startup India Seed Fund Scheme assistance.',
  },
  {
    icon: Landmark,
    title: 'Government Schemes',
    desc: 'Discovery of relevant schemes for startups.',
  },
  {
    icon: Award,
    title: 'Funding',
    desc: 'Grants, credit guarantee and other funding pathways.',
  },
  {
    icon: Briefcase,
    title: 'Government Procurement',
    desc: 'GeM and tender-related assistance.',
  },
  {
    icon: FileCheck,
    title: 'IPR Support',
    desc: 'Assistance with intellectual property requirements.',
  },
];

/* ============ DPIIT ELIGIBILITY CRITERIA ============ */
const DPIIT_CRITERIA = [
  {
    icon: Calendar,
    title: 'Entity Age',
    requirement: 'Less than 10 years from incorporation',
    detail: 'Counted from date of incorporation',
  },
  {
    icon: Percent,
    title: 'Annual Turnover',
    requirement: 'Less than ₹100 crore in any financial year',
    detail: 'Aggregate turnover across all years',
  },
  {
    icon: Building2,
    title: 'Entity Type',
    requirement: 'Private Limited, LLP, or Registered Partnership',
    detail: 'Proprietorship not eligible',
  },
  {
    icon: Sparkles,
    title: 'Innovation Focus',
    requirement: 'Working on innovation, technology, or scalable business',
    detail: 'Must have innovative component',
  },
  {
    icon: FileCheck,
    title: 'Original Entity',
    requirement: 'Not formed by splitting or reconstructing existing business',
    detail: 'Must be a fresh venture',
  },
];

/* ============ SECTION 80-IAC CRITERIA ============ */
const IAC_CRITERIA = [
  { label: 'DPIIT Recognition', value: 'Mandatory', icon: ShieldCheck },
  { label: 'Entity Type', value: 'Company or LLP', icon: Building2 },
  { label: 'Entity Age', value: 'Incorporated before 1 Apr 2026', icon: Calendar },
  { label: 'Annual Turnover', value: 'Below ₹200 crore', icon: Percent },
  { label: 'Tax Holiday', value: '100% for 3 consecutive years', icon: TrendingUp },
  { label: 'Application Route', value: 'Inter-Ministerial Board (IMB)', icon: Landmark },
];

/* ============ BENEFITS ============ */
const BENEFITS = [
  {
    icon: Percent,
    title: '3-Year Tax Holiday',
    desc: '100% income tax exemption under Section 80-IAC for eligible startups.',
  },
  {
    icon: Landmark,
    title: 'Access to Fund of Funds',
    desc: 'Investment from government-backed Fund of Funds for Startups.',
  },
  {
    icon: Award,
    title: 'Tender Relaxation',
    desc: 'Exemption from prior turnover and experience criteria in government tenders.',
  },
  {
    icon: FileCheck,
    title: 'IPR Fee Rebates',
    desc: 'Up to 80% rebate on patent filing and 50% on trademark filing fees.',
  },
  {
    icon: ShieldCheck,
    title: 'Self-Certification',
    desc: 'Self-certify compliance under 9 labour and environment laws.',
  },
  {
    icon: Users,
    title: 'Easy Winding Up',
    desc: 'Faster exit process for eligible startups under IBC.',
  },
];

/* ============ PROCESS STEPS ============ */
const PROCESS = [
  { num: '01', title: 'Eligibility Check', desc: 'Free assessment of your startup profile against DPIIT criteria.' },
  { num: '02', title: 'Documentation', desc: 'Prepare pitch deck, innovation description, and required documents.' },
  { num: '03', title: 'DPIIT Application', desc: 'File application on Startup India portal with proper categorization.' },
  { num: '04', title: '80-IAC Application', desc: 'Apply to Inter-Ministerial Board for tax benefit (if eligible).' },
  { num: '05', title: 'Follow-Up', desc: 'Track progress, respond to queries, and assist until outcome.' },
];

export default function Startup() {
  const rootRef = useRef(null);

  const startupServices = SERVICES.filter((s) =>
    ['startup-india-dpiit', 'section-80-iac', 'seed-fund', 'government-funding', 'cgss', 'gem-registration'].includes(s.slug)
  );

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
        <title>Startup Support — CertWinX</title>
        <meta
          name="description"
          content="Build your startup with the right support — DPIIT recognition, Section 80-IAC tax benefit, Seed Fund, government schemes and funding."
        />
      </Helmet>

      {/* ============ HERO ============ */}
      <section
        ref={rootRef}
        className="relative pt-36 lg:pt-44 pb-16 lg:pb-20 bg-[#0A0F1F] text-white overflow-hidden"
      >
        <div
          data-grid-shimmer
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(22,131,255,0.3) 50%, transparent 100%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '200% 100%, 64px 64px, 64px 64px',
          }}
        />

        <div
          data-glow
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue/15 blur-[120px] pointer-events-none"
        />
        <div
          data-glow
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[100px] pointer-events-none"
        />

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
                Startup Support Platform
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white text-balance mb-6">
                Build your startup with{' '}
                <span className="text-blue">the right support.</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
                From DPIIT recognition to tax benefits, funding and government procurement —
                one partner for the entire startup journey.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton to="/eligibility" variant="primary" size="lg">
                  Check Startup Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
                <MagneticButton href={getWhatsAppLink('startup support')} variant="whatsapp" size="lg">
                  WhatsApp Us
                </MagneticButton>
              </div>
            </RevealOnScroll>

            {/* Stats */}
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

      {/* ============ SUPPORT AREAS GRID ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-12 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                <span className="w-6 h-px bg-blue" />
                What We Cover
              </span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                Complete startup support, end-to-end.
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                From recognition to funding — every stage of the startup journey, handled
                professionally.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AREAS.map((a, i) => (
              <RevealOnScroll key={a.title} delay={i * 0.06}>
                <div className="group h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/30 hover:shadow-[0_25px_50px_-20px_rgba(23,105,255,0.25)] hover:-translate-y-1 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-blue/8 border border-blue/20 flex items-center justify-center mb-5 group-hover:bg-blue group-hover:border-blue transition-all duration-500">
                    <a.icon
                      size={20}
                      className="text-blue group-hover:text-white transition-colors duration-500"
                      strokeWidth={2.2}
                    />
                  </div>
                  <h3 className="font-display text-base font-bold text-ink mb-2 group-hover:text-blue transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-sm text-graphite leading-relaxed">{a.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DPIIT ELIGIBILITY CRITERIA ============ */}
      <section className="relative py-16 lg:py-20 bg-paper border-y border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                <span className="w-6 h-px bg-blue" />
                Eligibility Criteria
              </span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-4">
                Who can apply for <span className="text-blue">DPIIT recognition?</span>
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                DPIIT recognition requires your startup to meet specific criteria. Here's what you
                need to know before applying.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DPIIT_CRITERIA.map((c, i) => (
              <RevealOnScroll key={i} delay={i * 0.06}>
                <div className="group h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/30 hover:shadow-[0_20px_40px_-20px_rgba(23,105,255,0.25)] transition-all duration-500">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue/8 border border-blue/20 flex items-center justify-center shrink-0 group-hover:bg-blue group-hover:border-blue transition-all duration-500">
                      <c.icon
                        size={18}
                        className="text-blue group-hover:text-white transition-colors duration-500"
                        strokeWidth={2.2}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold tracking-[0.15em] text-blue uppercase mb-1">
                        {c.title}
                      </p>
                      <h3 className="font-display text-base font-bold text-ink leading-tight">
                        {c.requirement}
                      </h3>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-line">
                    <p className="text-xs text-muted italic">{c.detail}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 80-IAC CRITERIA ============ */}
      <section className="relative py-16 lg:py-20 bg-[#0A0F1F] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue/15 blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            <div className="lg:col-span-5">
              <RevealOnScroll>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-4">
                  <span className="w-6 h-px bg-blue" />
                  Section 80-IAC
                </span>
                <h2 className="font-display text-2xl lg:text-4xl font-bold text-white leading-tight mb-6">
                  3-Year <span className="text-blue">Tax Holiday</span> for eligible startups.
                </h2>
                <p className="text-base text-white/70 leading-relaxed mb-8">
                  Section 80-IAC of the Income Tax Act provides a 100% tax exemption for 3
                  consecutive years to DPIIT-recognised startups approved by the
                  Inter-Ministerial Board.
                </p>
                <MagneticButton to="/eligibility/80-iac" variant="primary" size="lg">
                  Check 80-IAC Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
                <p className="mt-4 text-xs text-white/40 leading-relaxed">
                  Approval subject to Inter-Ministerial Board review and decision.
                </p>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-7">
              <RevealOnScroll delay={0.2}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-7 lg:p-8 backdrop-blur-sm">
                  <div className="space-y-4">
                    {IAC_CRITERIA.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue/15 border border-blue/30 flex items-center justify-center shrink-0">
                            <c.icon size={13} className="text-blue" strokeWidth={2.2} />
                          </div>
                          <span className="text-sm text-white/60">{c.label}</span>
                        </div>
                        <span className="text-sm font-bold text-blue text-right ml-4">
                          {c.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 p-4 rounded-2xl bg-blue/8 border border-blue/20">
                    <p className="text-xs text-white/70 leading-relaxed">
                      <strong className="text-blue font-semibold">Note:</strong> 80-IAC
                      applications are evaluated by the Inter-Ministerial Board. CertWinX provides
                      professional assistance only.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS GRID ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-12 max-w-2xl text-center mx-auto">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                <span className="w-6 h-px bg-blue" />
                Why It Matters
              </span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                What you gain from recognition.
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                DPIIT recognition and 80-IAC approval unlock a range of benefits that accelerate
                growth.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <RevealOnScroll key={b.title} delay={i * 0.06}>
                <div className="group h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/30 hover:shadow-[0_25px_50px_-20px_rgba(23,105,255,0.25)] hover:-translate-y-1 transition-all duration-500">
                  <div className="w-11 h-11 rounded-2xl bg-blue/8 border border-blue/20 flex items-center justify-center mb-5 group-hover:bg-blue group-hover:border-blue transition-all duration-500">
                    <b.icon
                      size={18}
                      className="text-blue group-hover:text-white transition-colors duration-500"
                      strokeWidth={2.2}
                    />
                  </div>
                  <h3 className="font-display text-base font-bold text-ink mb-2 group-hover:text-blue transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-sm text-graphite leading-relaxed">{b.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="relative py-16 lg:py-20 bg-paper border-y border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-12 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                <span className="w-6 h-px bg-blue" />
                Our Process
              </span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                How we handle your startup journey.
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                A structured 5-step process from eligibility to outcome.
              </p>
            </div>
          </RevealOnScroll>

          <div className="space-y-3">
            {PROCESS.map((p, i) => (
              <RevealOnScroll key={p.num} delay={i * 0.06}>
                <div className="group flex items-start gap-5 bg-white border border-line rounded-2xl p-5 lg:p-6 hover:border-blue/30 hover:shadow-[0_15px_30px_-15px_rgba(23,105,255,0.25)] transition-all duration-500">
                  <span className="shrink-0 font-display text-3xl lg:text-4xl font-bold text-blue/25 group-hover:text-blue/50 transition-colors tabular">
                    {p.num}
                  </span>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-display text-base lg:text-lg font-bold text-ink mb-1 group-hover:text-blue transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-graphite leading-relaxed">{p.desc}</p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted group-hover:text-blue transition-all duration-500 shrink-0 mt-2 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RELATED SERVICES ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-3">
                  <span className="w-6 h-px bg-blue" />
                  Related Services
                </span>
                <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight">
                  Every service your startup needs.
                </h2>
              </div>
              <MagneticButton to="/services" variant="outline" size="md">
                All Services <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {startupServices.map((s, i) => (
              <RevealOnScroll key={s.slug} delay={i * 0.06}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group block h-full bg-white border border-line rounded-3xl p-7 hover:border-blue/30 hover:shadow-[0_25px_50px_-20px_rgba(23,105,255,0.25)] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-7">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-blue uppercase">
                      {s.category}
                    </span>
                    <span className="shrink-0 w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-all duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={15} strokeWidth={2.2} />
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink leading-tight mb-3 group-hover:text-blue transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-sm text-graphite leading-relaxed line-clamp-3">
                    {s.short}
                  </p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-16 lg:py-20 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="bg-[#0A0F1F] rounded-3xl p-8 lg:p-14 text-center relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue/20 blur-[80px]" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue/15 blur-[80px]" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30 text-[10px] font-bold tracking-[0.2em] text-white uppercase mb-6">
                  <Sparkles size={11} className="text-blue" />
                  Free Eligibility Check
                </span>

                <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 leading-tight">
                  Ready to explore your startup benefits?
                </h3>
                <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
                  Take a 60-second check and get personalised recommendations for your startup.
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <MagneticButton to="/eligibility" variant="primary" size="lg">
                    Check Startup Eligibility <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton to="/consultation" variant="outline" size="lg">
                    Talk to an Expert
                  </MagneticButton>
                </div>

                <p className="mt-6 text-xs text-white/40">
                  No advance professional fees* · Approval subject to authorities
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}