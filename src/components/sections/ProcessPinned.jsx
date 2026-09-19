import { useEffect, useRef } from 'react';
import {
  ClipboardList,
  FileSearch,
  FileCheck,
  Award,
  Clock,
  BadgeCheck,
  Sparkles,
  ShieldCheck,
  Handshake,
  ArrowUpRight,
} from 'lucide-react';
import { gsap } from '../../lib/gsap';
import RevealOnScroll from '../motion/RevealOnScroll';
import MagneticButton from '../motion/MagneticButton';

/* ============ 4 CERTIFICATION STEPS ============ */
const STEPS = [
  {
    num: 'STEP 1',
    icon: ClipboardList,
    title: 'Requirement Check',
    desc: 'Tell us your business type, industry and the certification you need. We identify the right standard for your goals.',
    highlight: 'Personalised recommendation',
    time: '3 mins',
  },
  {
    num: 'STEP 2',
    icon: FileSearch,
    title: 'Gap Assessment',
    desc: 'Our experts review your current processes and documentation — and identify what needs to be prepared before applying.',
    highlight: 'Clear roadmap before you start',
    time: '2–3 days',
  },
  {
    num: 'STEP 3',
    icon: FileCheck,
    title: 'Documentation & Audit Support',
    desc: 'We prepare quality manuals, process documents, and coordinate with certification bodies and auditors on your behalf.',
    highlight: 'End-to-end documentation',
    time: '5–15 days',
  },
  {
    num: 'STEP 4',
    icon: Award,
    title: 'Certification Issued',
    desc: 'After successful audit and approval, your certification is issued — enhancing credibility and opening new markets.',
    highlight: 'Recognised certification',
    time: '15–45 days',
  },
];

/* ============ 4 TRUST BADGES ============ */
const TRUST = [
  {
    icon: BadgeCheck,
    title: 'Recognised Bodies',
    desc: 'Verified certification partners',
  },
  {
    icon: Sparkles,
    title: 'Fast Track',
    desc: 'Expedited process where possible',
  },
  {
    icon: ShieldCheck,
    title: 'End-to-End Support',
    desc: 'From docs to certificate',
  },
  {
    icon: Handshake,
    title: 'Dedicated Expert',
    desc: 'Personal consultant assigned',
  },
];

export default function ProcessPinned() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-step]', { opacity: 1, y: 0 });
      gsap.set('[data-trust]', { opacity: 1, y: 0 });

      gsap.from('[data-step]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });

      gsap.from('[data-trust]', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 60%', once: true },
      });

      gsap.fromTo(
        '[data-connector]',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative py-16 lg:py-24 bg-canvas overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-blue/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue/4 blur-[100px]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">

        {/* ============ HEADER ============ */}
        <div className="mb-14 lg:mb-20 text-center max-w-3xl mx-auto">
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-4">
              <span className="w-6 h-px bg-blue" />
              Certification Process
              <span className="w-6 h-px bg-blue" />
            </span>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.1] tracking-tight mb-5">
              From requirement to certification —{' '}
              <span className="text-blue">simplified.</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-base lg:text-lg text-graphite leading-relaxed">
              A structured 4-step certification journey — from identifying the right standard
              to receiving your certificate.
            </p>
          </RevealOnScroll>
        </div>

        {/* ============ 4 STEPS GRID ============ */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-16 lg:mb-20">

          {/* Connector line */}
          <div className="hidden lg:block absolute top-[42px] left-[12.5%] right-[12.5%] h-px pointer-events-none">
            <div
              data-connector
              className="h-full bg-gradient-to-r from-blue/30 via-blue/60 to-blue/30"
            />
          </div>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} data-step className="group relative">
                <div className="relative h-full bg-white border border-line rounded-3xl p-6 hover:border-blue/40 hover:shadow-[0_25px_50px_-20px_rgba(23,105,255,0.3)] hover:-translate-y-1 transition-all duration-500">

                  {/* Step label + icon */}
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-blue uppercase">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-blue/8 border border-blue/20 flex items-center justify-center transition-all duration-500 group-hover:bg-blue group-hover:border-blue group-hover:scale-110">
                      <Icon
                        size={20}
                        className="text-blue group-hover:text-white transition-colors duration-500"
                        strokeWidth={2.2}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-ink leading-tight mb-3 group-hover:text-blue transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-graphite leading-relaxed mb-5">
                    {step.desc}
                  </p>

                  {/* Highlight pill */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-line">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue shrink-0" />
                    <span className="text-[11px] font-semibold text-graphite">
                      {step.highlight}
                    </span>
                  </div>

                  {/* Time chip */}
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-blue" strokeWidth={2.5} />
                    <span className="text-[10px] font-bold tracking-[0.15em] text-blue uppercase">
                      {step.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============ TRUST BADGES ============ */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-14">
            {TRUST.map((t, i) => (
              <div
                key={i}
                data-trust
                className="group flex items-center gap-3 bg-white border border-line rounded-2xl p-5 hover:border-blue/30 hover:shadow-[0_15px_30px_-15px_rgba(23,105,255,0.25)] transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-blue/8 border border-blue/20 flex items-center justify-center shrink-0 group-hover:bg-blue group-hover:border-blue transition-all duration-500">
                  <t.icon
                    size={16}
                    className="text-blue group-hover:text-white transition-colors duration-500"
                    strokeWidth={2.2}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-ink leading-tight mb-0.5 group-hover:text-blue transition-colors">
                    {t.title}
                  </p>
                  <p className="text-[11px] text-muted leading-snug">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* ============ CTA ============ */}
        <RevealOnScroll>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton to="/eligibility" variant="primary" size="lg">
              Check Certification Eligibility <ArrowUpRight size={15} />
            </MagneticButton>
            <MagneticButton to="/consultation" variant="outline" size="lg">
              Talk to an Expert
            </MagneticButton>
          </div>
          <p className="mt-6 text-center text-xs text-muted">
            No advance professional fees* · Certification subject to audit & approval
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}