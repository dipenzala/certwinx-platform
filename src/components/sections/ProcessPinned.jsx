import { useEffect, useRef } from 'react';
import {
  Lightbulb, Building2, Rocket, ClipboardCheck,
  Landmark, TrendingUp, ArrowUpRight, ArrowRight,
  ShieldCheck, CheckCircle2,
} from 'lucide-react';
import { gsap } from '../../lib/gsap';
import RevealOnScroll from '../motion/RevealOnScroll';
import MagneticButton from '../motion/MagneticButton';
import SectionHeading from '../ui/SectionHeading';

const JOURNEY_STAGES = [
  {
    step: '01',
    stage: 'Idea & Validation',
    icon: Lightbulb,
    headline: 'Structure & Feasibility',
    desc: 'Determining optimal corporate structure (Pvt Ltd vs LLP), founder agreements, and trademark clearance before formal setup.',
    milestone: 'Entity Advisory Complete',
    duration: 'Week 1',
  },
  {
    step: '02',
    stage: 'Incorporation',
    icon: Building2,
    headline: 'ROC & MCA Filing',
    desc: 'Drafting MOA/AOA, obtaining Director DIN & DSC, name reservation via SPICe+, Certificate of Incorporation, PAN & TAN.',
    milestone: 'COI & Legal Entity Formed',
    duration: 'Week 1–2',
  },
  {
    step: '03',
    stage: 'Startup Recognition',
    icon: Rocket,
    headline: 'DPIIT Accreditation',
    desc: 'Filing on Startup India portal with business model scalability dossier to unlock IPR fee concessions and statutory benefits.',
    milestone: 'DPIIT Certificate Issued',
    duration: 'Week 3–4',
  },
  {
    step: '04',
    stage: 'Scheme Eligibility',
    icon: ClipboardCheck,
    headline: 'Intelligence Mapping',
    desc: 'Multi-parameter evaluation for Section 80-IAC tax holiday, Seed Fund (SISFS), state subsidies, and collateral-free credit.',
    milestone: 'Statutory Eligibility Audit',
    duration: 'Week 4–5',
  },
  {
    step: '05',
    stage: 'Capital & Funding',
    icon: Landmark,
    headline: 'Grant & Debt Sanction',
    desc: 'Dossier preparation for incubators, SIDBI Fund of Funds, CGSS bank credit guarantees, and state startup seed grants.',
    milestone: 'Application & Disbursement',
    duration: 'Month 2–4',
  },
  {
    step: '06',
    stage: 'Business Scale',
    icon: TrendingUp,
    headline: 'Compliance & Growth',
    desc: 'Ongoing ROC annual filings, ISO 9001/27001 accreditation, MSME ZED certification, and GeM procurement onboarding.',
    milestone: 'Enterprise Maturity & Scale',
    duration: 'Ongoing',
  },
];

export default function ProcessPinned() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-journey-card]', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative py-20 lg:py-28 bg-canvas border-b border-line overflow-hidden"
    >
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="The Business Growth Journey"
          title="From Idea to Scaled Enterprise"
          subtitle="A structured, predictable 6-stage lifecycle to navigate statutory compliance, recognition, and government capital."
          align="center"
        />

        {/* 6-Stage Timeline Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOURNEY_STAGES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                data-journey-card
                className="group relative bg-paper border border-line rounded-3xl p-7 lg:p-8 shadow-card hover:shadow-card-hover hover:border-blue/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Step Number + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-2xl font-black text-blue/30 group-hover:text-blue transition-colors">
                      {s.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-blue-soft border border-blue/15 text-blue flex items-center justify-center group-hover:bg-blue group-hover:text-white transition-colors duration-300">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Stage Name */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      Stage {s.step}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-line" />
                    <span className="text-[10px] font-semibold text-blue uppercase tracking-wider">
                      {s.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-ink leading-snug mb-2 group-hover:text-blue transition-colors">
                    {s.stage}
                  </h3>
                  <h4 className="text-xs font-semibold text-blue-deep mb-3">
                    {s.headline}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-graphite leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                {/* Milestone Footer */}
                <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-graphite">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    <span className="font-medium text-[11px] truncate">{s.milestone}</span>
                  </div>
                  <ArrowRight size={14} className="text-muted group-hover:text-blue group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-14 p-6 lg:p-8 rounded-3xl bg-paper border border-line shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-display text-lg font-bold text-ink mb-1">
                Where does your business currently stand?
              </h4>
              <p className="text-xs sm:text-sm text-graphite">
                Whether incorporating your first company or scaling to 80-IAC tax exemption, we guide each stage.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <MagneticButton to="/eligibility" variant="primary">
                Assess My Venture Stage <ArrowUpRight size={15} />
              </MagneticButton>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
