import { useEffect, useRef, useState } from 'react';
import {
  Users,
  FileCheck,
  Target,
  ClipboardCheck,
  Handshake,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Search,
  FileSearch,
  FileText,
  Send,
  MessageSquare,
  Award,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import RevealOnScroll from '../motion/RevealOnScroll';
import { gsap } from '../../lib/gsap';

/* 6 Core Pillars */
const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Transparent Advisory',
    desc: 'Upfront feasibility evaluation before filing. We clearly explain eligibility hurdles, document gaps, and realistic timelines.',
  },
  {
    icon: FileCheck,
    title: 'Dossier & IP Preparation',
    desc: 'End-to-end documentation drafting, including business model scalability memos, IMB pitch decks, and ROC registers.',
  },
  {
    icon: Target,
    title: 'Multi-Scheme Intelligence',
    desc: 'Simultaneous evaluation across Startup India, DPIIT, Section 80-IAC, MSME Champions, and state subsidies.',
  },
  {
    icon: ClipboardCheck,
    title: 'Direct Portal Coordination',
    desc: 'Full assistance submitting through official government portals (Startup India, NSWS, Udyam, MCA21, IMB).',
  },
  {
    icon: Users,
    title: 'Dedicated Startup Consultants',
    desc: 'A single point of contact with domain expertise in corporate taxation, intellectual property, and government compliance.',
  },
  {
    icon: Handshake,
    title: 'Post-Recognition Support',
    desc: 'Ongoing advisory for annual ROC compliance, statutory audits, GeM onboarding, and certification renewals.',
  },
];

/* 7-Step Operational Working Methodology */
const SEVEN_STEPS = [
  {
    number: '01',
    title: 'Initial Business Assessment',
    category: 'Discovery',
    desc: 'Comprehensive review of your incorporation structure, date of incorporation, capitalization, shareholding pattern, and core innovation premise.',
    deliverable: 'Venture Diagnostic Report',
    icon: Search,
  },
  {
    number: '02',
    title: 'Eligibility Evaluation',
    category: 'Feasibility',
    desc: 'Cross-matching your business model against 18+ Central and State startup policies, grant criteria, and Section 80-IAC statutory rules.',
    deliverable: 'Schemes Feasibility Matrix',
    icon: FileSearch,
  },
  {
    number: '03',
    title: 'Document Review & Gap Analysis',
    category: 'Audit',
    desc: 'Auditing existing MOA/AOA, GST certificates, financial statements, pitch decks, and patents to uncover missing evidence or disqualifiers.',
    deliverable: 'Documentation Gap Checklist',
    icon: Target,
  },
  {
    number: '04',
    title: 'Application Preparation',
    category: 'Structuring',
    desc: 'Drafting high-rigor dossiers: scalability write-ups, innovation memoranda, presentation decks, and formal chartered accountant certifications.',
    deliverable: 'Official Submission Dossier',
    icon: FileText,
  },
  {
    number: '05',
    title: 'Submission Guidance',
    category: 'Filing',
    desc: 'Step-by-step guidance navigating official portals including Startup India, NSWS, Udyam, and the Inter-Ministerial Board e-filing system.',
    deliverable: 'Official Acknowledgement ID',
    icon: Send,
  },
  {
    number: '06',
    title: 'Follow-up & Coordination',
    category: 'Monitoring',
    desc: 'Proactive status monitoring, attending to government department queries, drafting rejoinders, and preparing for IMB committee meetings.',
    deliverable: 'Query Resolution Memoranda',
    icon: MessageSquare,
  },
  {
    number: '07',
    title: 'Post-Approval Guidance',
    category: 'Governance',
    desc: 'Assistance claiming tax holidays on Form 10-CCB, accessing GeM government procurement perks, and maintaining mandatory annual compliance.',
    deliverable: 'Long-term Statutory Roadmaps',
    icon: Award,
  },
];

export default function WhyCertWinX() {
  const [activeTab, setActiveTab] = useState('methodology'); // 'methodology' | 'pillars'
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section className="relative py-20 lg:py-28 bg-paper border-b border-line overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Why CertWinX"
          title="Professional Rigor. Transparent Engagement."
          subtitle="We eliminate bureaucracy and confusion with structured documentation, honest feasibility assessments, and a predictable 7-step working methodology."
          align="center"
        />

        {/* View Switcher Tabs */}
        <div className="flex justify-center mt-10 mb-12">
          <div className="inline-flex items-center p-1.5 rounded-full bg-white border border-line shadow-sm">
            <button
              onClick={() => setActiveTab('methodology')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'methodology'
                  ? 'bg-blue text-white shadow-sm'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              <Layers size={14} />
              <span>7-Step Working Methodology</span>
            </button>
            <button
              onClick={() => setActiveTab('pillars')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'pillars'
                  ? 'bg-blue text-white shadow-sm'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              <Shield size={14} />
              <span>Advisory Principles (6 Pillars)</span>
            </button>
          </div>
        </div>

        {/* ============ TAB 1: 7-STEP WORKING METHODOLOGY ============ */}
        {activeTab === 'methodology' && (
          <RevealOnScroll>
            <div className="bg-white border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-line mb-8">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-blue uppercase">
                    Predictable Advisory Lifecycle
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                    Our 7-Step Engagement & Execution Model
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  100% Procedural Transparency
                </div>
              </div>

              {/* 7-Step Timeline Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
                {SEVEN_STEPS.map((s, idx) => {
                  const isActive = activeStepIndex === idx;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.number}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between min-h-[110px] ${
                        isActive
                          ? 'bg-blue text-white border-blue shadow-md scale-102'
                          : 'bg-canvas text-ink border-line hover:border-blue/40 hover:bg-blue-soft/30'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`font-mono text-xs font-extrabold ${
                            isActive ? 'text-sky' : 'text-blue'
                          }`}
                        >
                          {s.number}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                            isActive ? 'bg-white/20 text-white' : 'bg-blue-soft text-blue'
                          }`}
                        >
                          <Icon size={12} />
                        </div>
                      </div>

                      <div className="mt-2">
                        <span
                          className={`block text-[9px] font-bold uppercase tracking-wider ${
                            isActive ? 'text-sky' : 'text-muted'
                          }`}
                        >
                          {s.category}
                        </span>
                        <h4 className="font-display text-xs font-bold leading-tight mt-0.5 line-clamp-2">
                          {s.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Step Highlight Console */}
              <div className="bg-canvas border border-line rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-blue bg-blue-soft px-2.5 py-1 rounded-full border border-blue/20">
                      Step {SEVEN_STEPS[activeStepIndex].number} of 07
                    </span>
                    <span className="text-xs font-bold text-muted uppercase tracking-wider">
                      {SEVEN_STEPS[activeStepIndex].category} Phase
                    </span>
                  </div>

                  <h4 className="font-display text-xl sm:text-2xl font-bold text-ink mb-3">
                    {SEVEN_STEPS[activeStepIndex].title}
                  </h4>

                  <p className="text-xs sm:text-sm text-graphite leading-relaxed mb-4">
                    {SEVEN_STEPS[activeStepIndex].desc}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-ink bg-white border border-line px-3.5 py-1.5 rounded-xl shadow-xs">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>Official Deliverable:</span>
                    <strong className="text-blue">{SEVEN_STEPS[activeStepIndex].deliverable}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : 0))}
                    disabled={activeStepIndex === 0}
                    className="px-4 py-2.5 rounded-xl bg-white border border-line text-xs font-bold text-graphite hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveStepIndex((prev) => (prev < SEVEN_STEPS.length - 1 ? prev + 1 : prev))
                    }
                    disabled={activeStepIndex === SEVEN_STEPS.length - 1}
                    className="px-4 py-2.5 rounded-xl bg-blue text-white text-xs font-bold hover:bg-deepblue disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next Step →
                  </button>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        )}

        {/* ============ TAB 2: ADVISORY PRINCIPLES (6 PILLARS) ============ */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealOnScroll key={item.title} delay={i * 0.05}>
                  <div className="group relative h-full rounded-3xl bg-white border border-line p-7 lg:p-8 shadow-card hover:shadow-card-hover hover:border-blue/30 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-soft border border-blue/15 text-blue flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-blue group-hover:text-white shrink-0">
                        <Icon size={22} strokeWidth={2} />
                      </div>

                      <h3 className="font-display text-lg font-bold text-ink leading-snug mb-2 group-hover:text-blue transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-graphite leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-line/60 flex items-center gap-1.5 text-xs text-blue font-medium">
                      <CheckCircle2 size={13} className="text-emerald-500" />
                      <span>Enterprise Advisory Standard</span>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        )}

        {/* Advisory Assurance Banner */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-14 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-blue-soft border border-blue/20 shadow-sm text-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-xs sm:text-sm font-bold text-blue-deep uppercase tracking-wide">
                No Advance Professional Fees for Initial Eligibility Assessment
              </p>
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
