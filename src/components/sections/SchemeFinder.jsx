import { useEffect, useRef } from 'react';
import { ArrowUpRight, Search, Target, ShieldCheck, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import MagneticButton from '../motion/MagneticButton';

const STEPS = [
  {
    icon: Search,
    num: '01',
    title: 'Input Entity Parameters',
    desc: 'Share your entity structure (Pvt Ltd, LLP, MSME), years since incorporation, and primary sector.',
  },
  {
    icon: Target,
    num: '02',
    title: 'Automated Rule Matching',
    desc: 'Our engine evaluates criteria against 16+ active Central & State schemes (Seed Fund, 80-IAC, PMEGP, CGSS).',
  },
  {
    icon: ShieldCheck,
    num: '03',
    title: 'Advisory Review & Filing',
    desc: 'Receive your personalized feasibility score, required document checklist, and dedicated advisory guidance.',
  },
];

export default function SchemeFinder() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-step-card]', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          once: true,
        },
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
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT: VALUE PROPOSITION */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-soft border border-blue/20 text-blue font-semibold text-[11px] tracking-wider uppercase mb-5">
              <Sparkles size={12} className="text-blue" />
              Government Schemes Explorer
            </span>

            <h2 className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-bold text-ink leading-[1.08] tracking-[-0.03em] mb-6 text-balance">
              Not sure which <span className="text-blue">government scheme</span> fits your venture?
            </h2>

            <p className="text-base sm:text-lg text-graphite leading-relaxed mb-8 max-w-xl">
              Central and State governments offer substantial grants, subsidies, tax exemptions, and credit guarantees. Our intelligent scheme discovery platform maps your startup to verified opportunities.
            </p>

            <div className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-paper border border-line shadow-sm">
              <span className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-graphite">
                Free Assessment · Verified Criteria · ~60 Seconds
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton to="/eligibility" variant="primary" size="lg">
                <Sparkles size={15} />
                Find My Schemes <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton to="/schemes" variant="outline" size="lg">
                <Filter size={15} />
                Browse Directory
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT: 3-STEP DISCOVERY FLOW */}
          <div className="lg:col-span-6">
            <div className="space-y-4">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.num}
                    data-step-card
                    className="p-6 rounded-2xl bg-paper border border-line shadow-sm hover:shadow-md hover:border-blue/30 transition-all flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-soft border border-blue/20 text-blue flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-display text-base font-bold text-ink">
                          {s.title}
                        </h4>
                        <span className="font-display text-xs font-bold text-blue/40">
                          {s.num}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-graphite leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
