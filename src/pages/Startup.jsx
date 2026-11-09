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
  Clock,
  Percent,
  Calendar,
  Users,
  Briefcase,
  Check,
} from 'lucide-react';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import MagneticButton from '../components/motion/MagneticButton';
import CounterNumber from '../components/motion/CounterNumber';
import { SERVICES } from '../data/services';
import { getWhatsAppLink } from '../lib/constants';

/* ============ AUTHENTIC OPERATIONAL METRICS ============ */
const HERO_STATS = [
  { num: 10, prefix: '', suffix: ' Yrs', label: 'Max Startup Window' },
  { num: 200, prefix: '₹', suffix: 'Cr', label: 'DPIIT Turnover Cap' },
  { num: 3, prefix: '', suffix: ' Yrs', label: '100% Tax Holiday' },
  { num: 100, prefix: '', suffix: '%', label: 'Procedural Advisory' },
];

/* ============ SUPPORT AREAS ============ */
const AREAS = [
  {
    icon: Rocket,
    title: 'Startup India & DPIIT',
    desc: 'Official sovereign recognition unlocking priority government schemes and IPR rebates.',
  },
  {
    icon: Percent,
    title: 'Section 80-IAC Tax Exemption',
    desc: '100% deduction on operational profits for 3 consecutive years via Inter-Ministerial Board.',
  },
  {
    icon: TrendingUp,
    title: 'Technology & Capital Grants',
    desc: 'Non-dilutive grant facilities up to ₹50 Lakhs for prototype validation & technology scaling.',
  },
  {
    icon: ShieldCheck,
    title: 'CGSS Credit Guarantee',
    desc: 'Collateral-free debt facilities up to ₹10 Crore with sovereign risk cover.',
  },
  {
    icon: Landmark,
    title: 'Fund of Funds (FFS)',
    desc: 'Venture equity access backed by SIDBI daughter funds across growth stages.',
  },
  {
    icon: Award,
    title: 'Tender Relaxation',
    desc: 'Exemption from prior turnover and experience criteria in public procurement (GeM).',
  },
  {
    icon: Briefcase,
    title: 'Angel Tax (Section 56) Exemption',
    desc: 'Statutory protection against angel tax scrutiny on share premium capital.',
  },
  {
    icon: FileCheck,
    title: 'Fast-Track IPR Support',
    desc: 'Up to 80% rebate on patent filings and 50% on trademark registration fees.',
  },
];

/* ============ DPIIT ELIGIBILITY CRITERIA ============ */
const DPIIT_CRITERIA = [
  {
    icon: Calendar,
    title: 'Entity Age',
    requirement: 'Less than 10 years from incorporation',
    detail: 'Counted strictly from Certificate of Incorporation date',
  },
  {
    icon: Percent,
    title: 'Annual Turnover',
    requirement: 'Turnover under ₹200 Crore in all fiscal years',
    detail: 'Aggregate gross turnover across all preceding balance sheets',
  },
  {
    icon: Building2,
    title: 'Entity Structure',
    requirement: 'Private Limited Company, LLP, or Registered Partnership',
    detail: 'Sole proprietorships are not eligible for DPIIT status',
  },
  {
    icon: Sparkles,
    title: 'Innovation Component',
    requirement: 'Working on innovative products, services or scalable models',
    detail: 'Must demonstrate novel intellectual property or technology differentiator',
  },
  {
    icon: FileCheck,
    title: 'Original Entity',
    requirement: 'Not formed by splitting up or reconstruction of existing business',
    detail: 'Must be an original, newly founded enterprise',
  },
];

/* ============ SECTION 80-IAC CRITERIA ============ */
const IAC_CRITERIA = [
  { label: 'DPIIT Recognition', value: 'Mandatory Active DIPP Number', icon: ShieldCheck },
  { label: 'Entity Structure', value: 'Private Limited or LLP Only', icon: Building2 },
  { label: 'Statutory Window', value: 'Incorporated on or after 1 Apr 2016', icon: Calendar },
  { label: 'Turnover Threshold', value: 'Below ₹200 Crore in all years', icon: Percent },
  { label: 'Statutory Benefit', value: '100% Tax Holiday for 3 consecutive years', icon: TrendingUp },
  { label: 'Approval Authority', value: 'Inter-Ministerial Board (IMB)', icon: Landmark },
];

/* ============ PROCESS ============ */
const PROCESS = [
  {
    num: '01',
    title: 'Regulatory & Document Audit',
    desc: 'We review your incorporation documents, shareholding pattern, pitch deck, and business model against DPIIT benchmarks.',
  },
  {
    num: '02',
    title: 'Innovation Dossier Structuring',
    desc: 'Our advisory team crafts an articulate innovation narrative highlighting technical novelty, IP, and scalable unit economics.',
  },
  {
    num: '03',
    title: 'Startup India Portal Submission',
    desc: 'Filing on the National Single Window System (NSWS) with complete statutory declarations and CA certifications.',
  },
  {
    num: '04',
    title: 'Scrutiny Management & Queries',
    desc: 'Direct liaison and prompt technical response if DPIIT or incubator review boards raise formal queries.',
  },
  {
    num: '05',
    title: 'Certification & Downstream Unlocks',
    desc: 'Receipt of official DPIIT certificate, opening immediate access to Section 80-IAC filings, CGSS debt guarantees, and GeM tender exemptions.',
  },
];

export default function Startup() {
  const startupServices = SERVICES.filter((s) => s.category === 'Startup').slice(0, 6);

  return (
    <>
      <Helmet>
        <title>Startup India & DPIIT Advisory — CertWinX</title>
        <meta
          name="description"
          content="End-to-end advisory for DPIIT recognition, Section 80-IAC 3-year tax exemptions, CGSS collateral-free credit facilities, and venture growth support."
        />
      </Helmet>

      {/* ============ HERO (Enterprise 3D Gradient Depth) ============ */}
      <section className="relative pt-36 lg:pt-44 pb-16 bg-canvas overflow-hidden border-b border-line">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/25 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">

            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-6 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                Indian Startup Ecosystem Advisory Desk
              </span>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-ink mb-6 text-balance">
                Scale your venture with{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1C83F3] via-[#0E60D2] to-[#0A1128]">
                  verified sovereign recognition.
                </span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-2xl mx-auto mb-10">
                Unlock official DPIIT recognition, 3-year Section 80-IAC corporate tax holidays, collateral-free debt guarantees, and statutory procurement benefits with structured advisory support.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <MagneticButton to="/eligibility" variant="primary" size="lg">
                  Check Startup Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
                <MagneticButton href={getWhatsAppLink('startup advisory')} variant="whatsapp" size="lg">
                  WhatsApp Advisory Desk
                </MagneticButton>
              </div>
            </RevealOnScroll>

            {/* Live Count-Up Metrics (Starting from 0) */}
            <RevealOnScroll delay={0.4}>
              <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-md border border-line shadow-[0_15px_35px_-10px_rgba(28,131,243,0.12)]">
                {HERO_STATS.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CounterNumber
                      from={0}
                      to={s.num}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      duration={2}
                      className="font-display text-xl font-bold text-ink tabular"
                    />
                    <span className="text-[10px] font-bold tracking-[0.15em] text-muted uppercase">
                      {s.label}
                    </span>
                    {i < HERO_STATS.length - 1 && (
                      <span className="w-px h-4 bg-line ml-3 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* ============ SUPPORT AREAS GRID ============ */}
      <section className="relative py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-12 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                <span className="w-5 h-px bg-blue" />
                Comprehensive Scope
              </span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                Every sovereign benefit and funding pathway, structured.
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                From initial DPIIT application to Inter-Ministerial Board defense and institutional capital growth strategy.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AREAS.map((a, i) => (
              <RevealOnScroll key={a.title} delay={i * 0.04}>
                <div className="h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/40 hover:shadow-[0_20px_40px_-15px_rgba(28,131,243,0.15)] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mb-5">
                      <a.icon size={20} className="text-blue" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-display text-base font-bold text-ink mb-2">
                      {a.title}
                    </h3>
                    <p className="text-xs text-graphite leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DPIIT ELIGIBILITY CRITERIA ============ */}
      <section className="relative py-16 lg:py-24 bg-paper border-y border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-12 max-w-3xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                <span className="w-5 h-px bg-blue" />
                Statutory Criteria
              </span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                DPIIT Recognition Eligibility Parameters
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                Evaluated under the Department for Promotion of Industry and Internal Trade gazette notification.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DPIIT_CRITERIA.map((c, i) => (
              <RevealOnScroll key={i} delay={i * 0.04}>
                <div className="h-full bg-white border border-line rounded-3xl p-6 shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center shrink-0">
                      <c.icon size={18} className="text-blue" strokeWidth={2.2} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.15em] text-blue uppercase mb-1">
                        {c.title}
                      </p>
                      <h3 className="font-display text-base font-bold text-ink leading-snug">
                        {c.requirement}
                      </h3>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-line/60">
                    <p className="text-xs text-muted">{c.detail}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 80-IAC FEATURE SECTION (Enterprise Deep Blue) ============ */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-deepblue via-[#12316e] to-[#0d224d] text-white overflow-hidden">
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            <div className="lg:col-span-6">
              <RevealOnScroll>
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-[0.2em] text-sky uppercase mb-4">
                  Section 80-IAC of Income Tax Act
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-5">
                  100% Corporate Tax Holiday for 3 Consecutive Years.
                </h2>
                <p className="text-base text-white/80 leading-relaxed mb-6">
                  Eligible DPIIT-recognised startups approved by the Inter-Ministerial Board (IMB) are granted a complete exemption from corporate income tax on profits for 3 consecutive assessment years out of their first 10 years.
                </p>
                <div className="flex flex-wrap gap-3">
                  <MagneticButton to="/eligibility/80-iac" variant="primary" size="lg">
                    Check 80-IAC Eligibility <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton href={getWhatsAppLink('80-IAC tax holiday')} variant="outline" size="lg">
                    Speak with Tax Specialist
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-6">
              <RevealOnScroll delay={0.2}>
                <div className="bg-white/10 border border-white/15 rounded-3xl p-6 lg:p-8 backdrop-blur-sm shadow-xl">
                  <div className="space-y-3.5">
                    {IAC_CRITERIA.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <c.icon size={15} className="text-sky shrink-0" />
                          <span className="text-xs text-white/70">{c.label}</span>
                        </div>
                        <span className="text-xs font-bold text-white text-right ml-4">
                          {c.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 leading-relaxed">
                    CertWinX assists in comprehensive innovation pitch drafting, product video production, and audit preparation for presentation before the IMB.
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="relative py-16 lg:py-24 bg-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-12 max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                <span className="w-5 h-px bg-blue" />
                Execution Roadmap
              </span>
              <h2 className="font-display text-2xl lg:text-4xl font-bold text-ink leading-tight mb-3">
                How CertWinX manages your startup filing.
              </h2>
              <p className="text-base text-graphite leading-relaxed">
                A disciplined 5-stage advisory process ensuring documentation accuracy and zero avoidable rejection risk.
              </p>
            </div>
          </RevealOnScroll>

          <div className="space-y-3">
            {PROCESS.map((p, i) => (
              <RevealOnScroll key={p.num} delay={i * 0.04}>
                <div className="flex items-start gap-5 bg-white border border-line rounded-2xl p-5 lg:p-6 shadow-sm hover:border-blue/40 transition-colors">
                  <span className="shrink-0 font-display text-2xl lg:text-3xl font-bold text-blue/30 tabular">
                    {p.num}
                  </span>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="font-display text-base lg:text-lg font-bold text-ink mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-graphite leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RELATED SERVICES ============ */}
      <section className="relative py-16 lg:py-20 bg-paper border-t border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                  <span className="w-5 h-px bg-blue" />
                  Related Services
                </span>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight">
                  Startup Services in this Vertical
                </h2>
              </div>
              <MagneticButton to="/services" variant="outline" size="md">
                Browse Full Directory <ArrowUpRight size={14} />
              </MagneticButton>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {startupServices.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group block h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/40 hover:shadow-[0_20px_40px_-15px_rgba(28,131,243,0.15)] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-blue uppercase">
                    {s.category}
                  </span>
                  <ArrowUpRight size={15} className="text-muted group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h3 className="font-display text-base font-bold text-ink leading-tight mb-2 group-hover:text-blue transition-colors">
                  {s.name}
                </h3>
                <p className="text-xs text-graphite leading-relaxed line-clamp-3">
                  {s.short}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
