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
  CheckCircle2,
} from 'lucide-react';
import MagneticButton from '../components/motion/MagneticButton';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import { getWhatsAppLink } from '../lib/constants';

/* ============ AUTHENTIC OPERATIONAL VALUES ============ */
const STATS = [
  { value: '6+ Yrs', label: 'Advisory Experience' },
  { value: '100%', label: 'Procedural Transparency' },
  { value: '28+', label: 'States & UTs Network' },
  { value: '24h', label: 'Client Advisory SLA' },
];

/* ============ CORE PRINCIPLES ============ */
const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Statutory Transparency',
    desc: 'Uncompromising clarity on official gazette guidelines, documentation readiness, and statutory turnaround timelines.',
  },
  {
    icon: Target,
    title: 'Zero Ambiguity Scrutiny',
    desc: 'Rigorous pre-submission document audit minimizing avoidable rejection risks before government boards.',
  },
  {
    icon: Award,
    title: 'Enterprise Precision',
    desc: 'Deep domain expertise across Startup India DPIIT recognition, Section 80-IAC tax holidays, and MSME frameworks.',
  },
  {
    icon: Heart,
    title: 'Authentic Partnership',
    desc: 'Driven by our core mission: "AAPKI TARAKKI KA SAATHI, BHAROSHA APKA, JIMMEDARI HUMARI".',
  },
];

/* ============ WHAT WE COVER ============ */
const COVERAGE = [
  { icon: Building2, label: 'Company & LLP Incorporation', href: '/services' },
  { icon: Rocket, label: 'DPIIT & Startup Recognition', href: '/startup' },
  { icon: Landmark, label: 'Section 80-IAC Tax Exemption', href: '/eligibility/80-iac' },
  { icon: TrendingUp, label: 'Seed Fund & Grants (SISFS/NIDHI)', href: '/funding' },
  { icon: ShieldCheck, label: 'CGSS & CGTMSE Credit Guarantees', href: '/funding' },
  { icon: Award, label: 'ISO 9001/27001 & ZED Certifications', href: '/certifications' },
  { icon: BadgeCheck, label: 'MSME Udyam & PMEGP Subsidies', href: '/msme' },
  { icon: FileCheck, label: 'Corporate Statutory Compliance', href: '/services' },
];

/* ============ WHY CERTWINX ============ */
const WHY = [
  {
    num: '01',
    title: 'Regulatory Intelligence',
    desc: 'Direct mapping of central and state gazette notifications to actionable enterprise roadmaps.',
  },
  {
    num: '02',
    title: 'Full-Spectrum Scope',
    desc: 'A unified single-window advisory covering incorporation, recognitions, incentives, and continuous compliance.',
  },
  {
    num: '03',
    title: 'Structured Execution',
    desc: 'Dedicated account managers guiding your team through paperwork, portal filings, and verification queries.',
  },
  {
    num: '04',
    title: 'Institutional Trust',
    desc: 'Headquartered in Ahmedabad, Gujarat, serving high-growth founders and established enterprises pan-India.',
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About CertWinX — #1 Startup India & Section 80-IAC Advisory | 6+ Years Experience</title>
        <meta
          name="description"
          content="CertWinX brings 6+ years of specialized advisory experience guiding Indian startups across all 28 states for Section 80-IAC 100% Tax Holidays, DPIIT recognition, SISFS Seed Grants & corporate compliance."
        />
      </Helmet>

      {/* ============ HERO (Enterprise Light-Blue) ============ */}
      <section className="relative pt-36 lg:pt-44 pb-16 bg-canvas overflow-hidden border-b border-line">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7">
              <RevealOnScroll>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                  CertWinX Private Limited · Ahmedabad, Gujarat
                </span>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] tracking-tight text-ink mb-6 text-balance">
                  Empowering Indian enterprise with regulatory intelligence.
                </h1>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <p className="text-base sm:text-lg text-graphite leading-relaxed mb-6">
                  CertWinX Private Limited is an enterprise-grade digital advisory and schemes intelligence platform. We bridge the gap between complex sovereign policies and visionary Indian entrepreneurs.
                </p>
                <div className="p-4 rounded-2xl bg-white border border-line shadow-sm mb-8 inline-block">
                  <p className="text-xs font-bold text-deepblue tracking-wide uppercase">
                    Official Brand Credo:
                  </p>
                  <p className="font-display text-sm font-semibold text-ink mt-0.5">
                    "AAPKI TARAKKI KA SAATHI, BHAROSHA APKA, JIMMEDARI HUMARI"
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <div className="flex flex-wrap items-center gap-3">
                  <MagneticButton to="/eligibility" variant="primary" size="lg">
                    Assess My Business Opportunities <ArrowUpRight size={15} />
                  </MagneticButton>
                  <MagneticButton href={getWhatsAppLink('about enquiry')} variant="whatsapp" size="lg">
                    WhatsApp Advisory Desk
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Card: Stats & Institutional Pillars */}
            <div className="lg:col-span-5">
              <RevealOnScroll delay={0.2}>
                <div className="bg-white border border-line rounded-3xl p-7 lg:p-8 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-ink mb-5 pb-3 border-b border-line">
                    Operational Integrity & Standards
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {STATS.map((s, i) => (
                      <div key={i} className="p-3.5 bg-canvas rounded-2xl border border-line/60">
                        <span className="font-display text-2xl font-bold text-blue block mb-0.5">
                          {s.value}
                        </span>
                        <span className="text-[10px] font-bold tracking-wider text-muted uppercase block leading-tight">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-graphite leading-relaxed">
                    Headquartered in Ahmedabad, Gujarat, CertWinX operates with complete statutory compliance, zero fabricated outcomes, and strict procedural alignment.
                  </p>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section className="py-16 lg:py-24 bg-paper border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="max-w-2xl mb-12">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                <span className="w-5 h-px bg-blue" />
                Guiding Principles
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight">
                Built on transparency, precision & accountability.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <RevealOnScroll key={v.title} delay={i * 0.04}>
                <div className="h-full bg-white border border-line rounded-3xl p-6 shadow-sm hover:border-blue/40 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center mb-5">
                      <v.icon size={20} className="text-blue" strokeWidth={2.2} />
                    </div>
                    <h3 className="font-display text-base font-bold text-ink mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs text-graphite leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT WE COVER ============ */}
      <section className="py-16 lg:py-24 bg-canvas border-b border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="max-w-2xl mb-12">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-2">
                <span className="w-5 h-px bg-blue" />
                Advisory Scope
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink leading-tight">
                Comprehensive Coverage Across Every Business Milestone
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COVERAGE.map((c, i) => (
              <RevealOnScroll key={c.label} delay={i * 0.03}>
                <Link
                  to={c.href}
                  className="group flex items-center justify-between p-5 bg-white border border-line rounded-2xl hover:border-blue/40 hover:shadow-[0_15px_30px_-10px_rgba(28,131,243,0.15)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center shrink-0">
                      <c.icon size={16} className="text-blue" />
                    </div>
                    <span className="font-display text-xs font-bold text-ink group-hover:text-blue transition-colors">
                      {c.label}
                    </span>
                  </div>
                  <ArrowUpRight size={14} className="text-muted group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-deepblue via-[#12316e] to-[#0d224d] text-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <RevealOnScroll>
            <div className="max-w-2xl mb-12">
              <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-[0.2em] text-sky uppercase mb-3">
                Why CertWinX
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                Structured assistance. Genuine accountability.
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w, i) => (
              <RevealOnScroll key={i} delay={i * 0.04}>
                <div className="h-full bg-white/10 border border-white/15 rounded-3xl p-6 backdrop-blur-sm">
                  <p className="font-display text-3xl font-bold text-sky mb-4 tabular">
                    {w.num}
                  </p>
                  <h3 className="font-display text-base font-bold mb-2">
                    {w.title}
                  </h3>
                  <p className="text-xs text-white/75 leading-relaxed">{w.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
