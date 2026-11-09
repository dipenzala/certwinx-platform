import { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Calendar,
  Percent,
  Sparkles,
  Award,
  ChevronRight,
  AlertCircle,
  FileText,
  Users,
  Check,
} from 'lucide-react';
import MagneticButton from '../motion/MagneticButton';
import RevealOnScroll from '../motion/RevealOnScroll';

/* The 6-Stage Process Flow */
const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Company Formation',
    entity: 'Pvt Ltd or LLP',
    desc: 'Incorporated on or after 1 April 2016 with MCA registration.',
  },
  {
    step: '02',
    title: 'DPIIT Recognition',
    entity: 'Startup India Portal',
    desc: 'Securing official recognition certificate as mandatory prerequisite.',
  },
  {
    step: '03',
    title: 'Dossier Preparation',
    entity: 'CertWinX Advisory',
    desc: 'Scalability memo, IMB presentation deck, audited financials & IP links.',
  },
  {
    step: '04',
    title: 'IMB Board Review',
    entity: 'Inter-Ministerial Board',
    desc: 'Scrutiny across innovation, scalability, employment & wealth creation.',
  },
  {
    step: '05',
    title: 'Approval Decision',
    entity: 'CBDT & DPIIT Gazette',
    desc: 'Official Section 80-IAC certificate issued with permanent gazette number.',
  },
  {
    step: '06',
    title: 'Tax Benefit Claim',
    entity: 'Form 10-CCB Filing',
    desc: '100% tax holiday claimed for any 3 consecutive years within 10-year block.',
  },
];

const POINTS = [
  'DPIIT Recognition as strict mandatory prerequisite',
  'Private Limited or LLP incorporated after 1 April 2016',
  'Turnover under ₹200 Cr in any preceding financial year',
  'Innovative product/service with scalable employment or wealth creation',
  'Preparation of scalability memorandum & pitch dossier',
  'Representation & query resolution before Inter-Ministerial Board (IMB)',
];

const ROWS = [
  { label: 'DPIIT Recognition', value: 'Prerequisite (Mandatory)', icon: ShieldCheck },
  { label: 'Eligible Entity', value: 'Private Ltd / LLP', icon: Building2 },
  { label: 'Tax Holiday Quantum', value: '100% Tax Exemption for 3 Consecutive Years', icon: Percent },
  { label: 'Claim Window', value: 'Any 3 out of first 10 years from incorporation', icon: Calendar },
  { label: 'Sanctioning Body', value: 'Inter-Ministerial Board (IMB - DPIIT & CBDT)', icon: Award },
];

export default function Section80IAC() {
  const rootRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      ref={rootRef}
      className="relative py-20 lg:py-28 bg-canvas border-b border-line overflow-hidden"
    >
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Header */}
        <div className="grid lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-soft border border-blue/20 text-blue font-semibold text-[11px] tracking-wider uppercase mb-5">
                <Sparkles size={12} className="text-blue" />
                Startup Taxation Intelligence
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold text-ink leading-[1.08] tracking-[-0.03em] text-balance mb-6">
                Section 80-IAC tax exemption,{' '}
                <span className="text-blue">handled with precision.</span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-3xl font-normal">
                Section 80-IAC of the Income Tax Act provides eligible DPIIT-recognised startups with a 100% tax holiday on business profits for three consecutive assessment years. CertWinX coordinates your application dossier from initial eligibility through IMB committee presentation.
              </p>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <RevealOnScroll delay={0.25}>
              <div className="bg-white border border-line rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-blue uppercase tracking-wider mb-2">
                  <ShieldCheck size={16} />
                  <span>Statutory Impact</span>
                </div>
                <div className="font-display text-2xl font-bold text-ink mb-1">
                  100% Tax Relief
                </div>
                <p className="text-xs text-graphite leading-relaxed">
                  Retain 100% of corporate operational earnings to reinvest in tech, talent acquisition, and market expansion.
                </p>
                <div className="mt-4 pt-3 border-t border-line">
                  <MagneticButton to="/eligibility/80-iac" variant="primary" size="sm" className="w-full text-center">
                    Check 80-IAC Eligibility <ArrowUpRight size={14} />
                  </MagneticButton>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* ============ VISUAL PROCESS FLOW PIPELINE ============ */}
        <RevealOnScroll delay={0.2}>
          <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-line mb-8">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-blue uppercase">
                  End-to-End Approval Lifecycle
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                  Section 80-IAC Statutory Process Roadmap
                </h3>
              </div>
              <p className="text-xs text-muted max-w-xs">
                Predictable six-stage progression from incorporation to gazetted benefit claim.
              </p>
            </div>

            {/* Stepper Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4 relative">
              {PROCESS_STEPS.map((s, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(idx)}
                    className={`text-left rounded-2xl p-4 transition-all duration-200 border relative cursor-pointer ${
                      isActive
                        ? 'bg-blue text-white border-blue shadow-md scale-[1.02]'
                        : 'bg-canvas text-ink border-line hover:border-blue/40 hover:bg-blue-soft/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isActive ? 'text-sky' : 'text-blue'
                        }`}
                      >
                        {s.step}
                      </span>
                      {idx < PROCESS_STEPS.length - 1 && (
                        <ChevronRight
                          size={14}
                          className={`hidden lg:block ${
                            isActive ? 'text-white/70' : 'text-muted'
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`block text-[10px] font-bold tracking-wider uppercase mb-1 ${
                        isActive ? 'text-sky' : 'text-muted'
                      }`}
                    >
                      {s.entity}
                    </span>
                    <h4 className="font-display text-xs sm:text-sm font-bold leading-tight mb-2">
                      {s.title}
                    </h4>
                    <p
                      className={`text-[11px] leading-relaxed ${
                        isActive ? 'text-white/90' : 'text-graphite'
                      }`}
                    >
                      {s.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detail Callout */}
            <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-canvas/70 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-ink">
                      Stage {PROCESS_STEPS[activeStep].step}: {PROCESS_STEPS[activeStep].title}
                    </span>
                    <span className="text-[10px] font-semibold text-blue bg-blue-soft px-2 py-0.5 rounded-full border border-blue/20">
                      {PROCESS_STEPS[activeStep].entity}
                    </span>
                  </div>
                  <p className="text-xs text-graphite mt-0.5">
                    {PROCESS_STEPS[activeStep].desc} CertWinX assists in comprehensive dossier structuring to prevent committee rejections.
                  </p>
                </div>
              </div>

              <MagneticButton to="/eligibility/80-iac" variant="outline" size="sm" className="shrink-0">
                Verify Stage Eligibility →
              </MagneticButton>
            </div>
          </div>
        </RevealOnScroll>

        {/* ============ LOWER TWO COLUMNS: CRITERIA & MATRIX ============ */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Statutory Prerequisites & Scope */}
          <div className="lg:col-span-7">
            <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-blue" />
              Statutory Evaluation Criteria
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {POINTS.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite bg-white border border-line rounded-xl p-3 shadow-xs"
                >
                  <CheckCircle2 size={15} className="text-blue mt-0.5 shrink-0" />
                  <span className="leading-snug">{p}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton to="/eligibility/80-iac" variant="primary" size="md">
                Launch 80-IAC Calculator <ArrowUpRight size={14} />
              </MagneticButton>
              <MagneticButton to="/services/section-80-iac" variant="outline" size="md">
                Read Comprehensive Guide
              </MagneticButton>
            </div>
          </div>

          {/* Right: Statutory Matrix Table */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-line rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-line mb-5">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-blue uppercase">
                    Statutory Matrix
                  </span>
                  <h4 className="font-display text-base font-bold text-ink">Section 80-IAC Snapshot</h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                  Active Exemption
                </span>
              </div>

              <div className="space-y-3 mb-6">
                {ROWS.map((r) => (
                  <div
                    key={r.label}
                    className="p-3 rounded-xl bg-canvas border border-line/80 flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-soft text-blue flex items-center justify-center shrink-0 mt-0.5">
                      <r.icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wider">{r.label}</p>
                      <p className="text-xs sm:text-sm font-bold text-ink leading-snug mt-0.5">{r.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-blue-soft/50 border border-blue/20">
                <p className="text-xs text-graphite leading-relaxed">
                  <strong className="text-blue-deep font-semibold">100% Tax Relief:</strong> Unlike ordinary deductions, Section 80-IAC exempts eligible startups from 100% of income tax on profits for 3 consecutive years.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============ MANDATORY STATUTORY DISCLOSURE BANNER ============ */}
        <RevealOnScroll delay={0.3}>
          <div className="mt-14 p-5 sm:p-6 rounded-2xl bg-white border border-line shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <AlertCircle size={20} />
            </div>
            <div className="flex-1 text-xs sm:text-sm text-graphite leading-relaxed">
              <p className="font-bold text-ink mb-1">
                Statutory Disclosure & Government Sanctioning Jurisdiction
              </p>
              <p>
                DPIIT recognition alone does not automatically grant Section 80-IAC exemption. Approval is determined at the sole discretion of the Inter-Ministerial Board (IMB) under Central Board of Direct Taxes (CBDT) notifications. CertWinX is an independent advisory and intelligence platform providing end-to-end documentation structuring, eligibility assessment, financial presentation, and portal submission guidance.
              </p>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
