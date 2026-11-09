import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, ShieldCheck, Rocket, Landmark,
  Percent, TrendingUp, ArrowRight, CheckCircle2,
  ArrowUpRight, Award, Sparkles, FileCheck, Layers
} from 'lucide-react';
import MagneticButton from '../motion/MagneticButton';
import SectionHeading from '../ui/SectionHeading';

const STAGES = [
  {
    step: '01',
    title: 'Business Incorporation',
    short: 'Incorporation & Legal Setup',
    icon: Building2,
    badge: 'Stage 1 · Foundation',
    timeline: 'Week 1–2',
    desc: 'Determining optimal legal entity (Private Limited Company, LLP, or Partnership), reserving corporate name, drafting MOA/AOA, and securing MCA Certificate of Incorporation.',
    deliverables: [
      'SPICe+ MCA Name Reservation & Incorporation',
      'Director Identification Numbers (DIN) & DSC',
      'PAN, TAN & Statutory Corporate Bank Account',
    ],
    unlocks: 'Legal Entity, Corporate Bank Account, GST Readiness',
    link: '/services',
    linkText: 'Explore Incorporation Scope',
  },
  {
    step: '02',
    title: 'MSME & Udyam Registration',
    short: 'Sovereign MSME Identity',
    icon: ShieldCheck,
    badge: 'Stage 2 · Micro & Small Enterprise',
    timeline: 'Week 2–3',
    desc: 'Registering on the National Udyam portal to obtain permanent sovereign enterprise status, opening priority bank lending, lower credit fees, and subsidy access.',
    deliverables: [
      'Official Udyam Certificate with QR verification',
      'Priority Sector Lending (PSL) classification',
      'Protection against delayed commercial payments',
    ],
    unlocks: 'PMEGP Subsidy, CGTMSE Loan Guarantees, ZED Certification',
    link: '/msme',
    linkText: 'Explore MSME Framework',
  },
  {
    step: '03',
    title: 'Startup India & DPIIT Recognition',
    short: 'DPIIT Sovereign Recognition',
    icon: Rocket,
    badge: 'Stage 3 · Startup Accreditation',
    timeline: 'Week 3–4',
    desc: 'Structuring innovation dossiers and filing on Startup India National Single Window to secure official DPIIT recognition, 80% patent rebates, and tender exemptions.',
    deliverables: [
      'Official DPIIT Certificate of Recognition',
      'Section 56 Angel Tax Scrutiny Exemption',
      'Public Procurement (GeM) Tender Relaxations',
    ],
    unlocks: 'Section 80-IAC Tax Exemption, DST NIDHI Grants, TIDE 2.0',
    link: '/startup',
    linkText: 'DPIIT Recognition Roadmap',
  },
  {
    step: '04',
    title: 'Government Grants & Funding',
    short: 'Capital & Tech Grants',
    icon: Landmark,
    badge: 'Stage 4 · Non-Dilutive Capital',
    timeline: 'Month 2–4',
    desc: 'Filing for central technology grants including DST NIDHI-PRAYAS, BIRAC BIG, MeitY TIDE 2.0, and state innovation schemes.',
    deliverables: [
      'Detailed Project Report (DPR) & Pitch Deck',
      'Technical Evaluation & Committee Presentation Kit',
      'Milestone Disbursement Compliance Tracking',
    ],
    unlocks: 'Up to ₹50L Non-Dilutive Prototyping Grants, SIDBI FFS',
    link: '/funding',
    linkText: 'View Funding Schemes',
  },
  {
    step: '05',
    title: 'Section 80-IAC Tax Exemption',
    short: '100% Corporate Tax Holiday',
    icon: Percent,
    badge: 'Stage 5 · Fiscal Incentives',
    timeline: 'Month 3–6',
    desc: 'Preparing specialized technical novelty dossiers and defense for presentation before the Inter-Ministerial Board (IMB) for 100% tax exemption for 3 consecutive years.',
    deliverables: [
      '40+ page Comprehensive Technical Novelty Dossier',
      'IMB Video Walkthrough & IP Documentation',
      'Central Gazette Notification Verification',
    ],
    unlocks: 'Zero Corporate Income Tax on Profits for 3 Consecutive Years',
    link: '/eligibility/80-iac',
    linkText: 'Section 80-IAC Audit',
  },
  {
    step: '06',
    title: 'Compliance & Enterprise Scale',
    short: 'Governance & Maturity',
    icon: TrendingUp,
    badge: 'Stage 6 · National Scale',
    timeline: 'Ongoing',
    desc: 'Annual ROC filings, DIR-3 KYC, ISO 9001/27001 quality accreditations, MSME ZED Gold certification, and CGSS credit guarantees up to ₹10 Crore for rapid scale.',
    deliverables: [
      'ROC Annual Filing & Secretarial Governance',
      'ISO 9001:2015 & ISO 27001 Accreditations',
      'CGSS Collateral-Free Loans up to ₹10 Crore',
    ],
    unlocks: 'Institutional Venture Due Diligence, Global Export Contracts',
    link: '/services',
    linkText: 'Full Enterprise Scope',
  },
];

export default function ProcessPinned() {
  const [activeStage, setActiveStage] = useState(0);
  const current = STAGES[activeStage];
  const Icon = current.icon;

  return (
    <section className="relative py-20 lg:py-28 bg-canvas border-b border-line overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-blue/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-sky/20 blur-[120px]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Heading */}
        <SectionHeading
          eyebrow="The Business Growth Journey"
          title="From Incorporation to Scaled Enterprise"
          subtitle="A predictable 6-stage lifecycle navigating statutory setup, sovereign recognitions, tax exemptions, and government capital."
          align="center"
        />

        {/* ============ INTERACTIVE HORIZONTAL TIMELINE BAR (Desktop) ============ */}
        <div className="mt-14 mb-10 hidden lg:block">
          <div className="relative flex items-center justify-between">
            {/* Connecting Track Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] bg-line z-0" />
            <div
              className="absolute left-6 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-blue to-deepblue transition-all duration-500 z-0"
              style={{ width: `${(activeStage / (STAGES.length - 1)) * 95}%` }}
            />

            {/* Stage Milestone Nodes */}
            {STAGES.map((s, i) => {
              const active = activeStage === i;
              const completed = activeStage > i;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStage(i)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                  aria-label={`Jump to Stage ${s.step}: ${s.title}`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display text-sm font-bold transition-all duration-300 ${
                      active
                        ? 'bg-blue text-white shadow-[0_10px_25px_-5px_rgba(28,131,243,0.6)] scale-110'
                        : completed
                        ? 'bg-deepblue text-white'
                        : 'bg-white border-2 border-line text-graphite group-hover:border-blue/50'
                    }`}
                  >
                    {completed ? <CheckCircle2 size={18} /> : s.step}
                  </div>
                  <span
                    className={`mt-3 text-xs font-bold transition-colors tracking-tight text-center max-w-[110px] ${
                      active ? 'text-blue' : 'text-graphite group-hover:text-ink'
                    }`}
                  >
                    {s.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============ ACTIVE STAGE HERO CARD ============ */}
        <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm transition-all duration-300 mb-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left: Stage Title & Description */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-xs font-bold text-blue uppercase tracking-wider">
                  {current.badge}
                </span>
                <span className="text-xs font-semibold text-muted">
                  Estimated Timeline: <strong className="text-ink">{current.timeline}</strong>
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue/10 border border-blue/20 flex items-center justify-center text-blue shrink-0 mt-1">
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight">
                    {current.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-blue mt-0.5">
                    Stage {current.step} Milestone
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-graphite leading-relaxed">
                {current.desc}
              </p>

              {/* Unlocks Banner */}
              <div className="p-4 rounded-2xl bg-sky/20 border border-sky/30">
                <p className="text-[10px] font-bold text-deepblue uppercase tracking-wider mb-1">
                  Government Privileges Unlocked at this Stage:
                </p>
                <p className="text-xs sm:text-sm font-semibold text-ink">
                  {current.unlocks}
                </p>
              </div>

              <div className="pt-2">
                <MagneticButton to={current.link} variant="primary" size="md">
                  {current.linkText} <ArrowUpRight size={14} />
                </MagneticButton>
              </div>
            </div>

            {/* Right: Key Deliverables Checklist */}
            <div className="lg:col-span-5 bg-canvas rounded-2xl border border-line p-6 lg:p-8">
              <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers size={16} className="text-blue" />
                CertWinX Advisory Deliverables
              </h4>

              <div className="space-y-3.5">
                {current.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-line/60">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-ink leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Navigation stepper buttons */}
              <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
                <button
                  disabled={activeStage === 0}
                  onClick={() => setActiveStage(activeStage - 1)}
                  className={`text-xs font-bold transition-colors ${
                    activeStage === 0 ? 'text-muted/40 cursor-not-allowed' : 'text-graphite hover:text-ink'
                  }`}
                >
                  ← Previous Stage
                </button>
                <span className="text-xs font-mono font-bold text-muted">
                  {activeStage + 1} of {STAGES.length}
                </span>
                <button
                  disabled={activeStage === STAGES.length - 1}
                  onClick={() => setActiveStage(activeStage + 1)}
                  className={`text-xs font-bold transition-colors ${
                    activeStage === STAGES.length - 1 ? 'text-muted/40 cursor-not-allowed' : 'text-blue hover:text-deepblue'
                  }`}
                >
                  Next Stage →
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ============ COMPACT STAGE PREVIEWS (Mobile & Desktop Quick Access) ============ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {STAGES.map((s, i) => {
            const active = activeStage === i;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStage(i)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  active
                    ? 'border-blue bg-blue/5 shadow-sm'
                    : 'border-line bg-white hover:border-blue/30'
                }`}
              >
                <span className="text-[10px] font-bold text-muted uppercase block mb-1">
                  Stage {s.step}
                </span>
                <span className={`text-xs font-bold block leading-tight ${active ? 'text-blue' : 'text-ink'}`}>
                  {s.short}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-deepblue to-[#0e275c] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h4 className="font-display text-xl font-bold mb-1">
              Where does your business currently stand?
            </h4>
            <p className="text-xs sm:text-sm text-white/80">
              Run our 90-second diagnostic to determine your venture's next statutory milestone and eligible grants.
            </p>
          </div>
          <div className="shrink-0">
            <MagneticButton to="/eligibility" variant="primary" size="md">
              Assess Venture Stage <ArrowUpRight size={14} />
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}
