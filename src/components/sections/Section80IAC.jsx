import { useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, FileCheck, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import MagneticButton from '../motion/MagneticButton';
import RevealOnScroll from '../motion/RevealOnScroll';

const POINTS = [
  'What is Section 80-IAC?',
  'Who may be eligible?',
  'DPIIT relationship',
  'Documentation requirements',
  'Application preparation',
  'IMB process coordination',
  'Query assistance and follow-up',
];

const ROWS = [
  { label: 'DPIIT Recognition', value: 'Prerequisite' },
  { label: 'Entity Type', value: 'Company / LLP' },
  { label: 'Tax Holiday', value: 'Up to 3 years' },
  { label: 'Application Route', value: 'IMB Process' },
];

const GUARANTEES = [
  { icon: ShieldCheck, label: '100% Professional Assistance' },
  { icon: FileCheck, label: '100% Documentation Support' },
  { icon: Award, label: '100% Transparent Process' },
  { icon: Zap, label: '100% Application Prepared' },
];

export default function Section80IAC() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Reveal rows
      gsap.from('[data-iac="row"]', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      });

      // Reveal points
      gsap.from('[data-iac="point"]', {
        x: -12,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      });

      // Reveal guarantee badges
      gsap.from('[data-iac="guarantee"]', {
        y: 16,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });

      // Live pulse on the guarantee badge
      gsap.to('[data-guarantee-dot]', {
        scale: 1.6,
        opacity: 0.4,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Animated grid pattern shimmer
      gsap.to('[data-grid-shimmer]', {
        backgroundPosition: '200% 0',
        duration: 8,
        ease: 'none',
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative py-20 lg:py-28 bg-[#0A0F1F] text-white overflow-hidden"
    >
      {/* ============ BACKGROUND ============ */}
      {/* Grid pattern with shimmer */}
      <div
        data-grid-shimmer
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, rgba(22,131,255,0.3) 50%, transparent 100%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '200% 100%, 64px 64px, 64px 64px',
        }}
      />

      {/* Blue glow blob (top-right) */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue/15 blur-[120px] pointer-events-none" />

      {/* Blue glow blob (bottom-left) */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[100px] pointer-events-none" />

      {/* Floating blue particles */}
      {[
        { top: '20%', left: '15%', size: 3 },
        { top: '40%', left: '85%', size: 2 },
        { top: '65%', left: '10%', size: 2 },
        { top: '80%', left: '90%', size: 3 },
        { top: '30%', left: '50%', size: 2 },
      ].map((p, i) => (
        <span
          key={i}
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

          {/* LEFT COLUMN */}
          <div className="lg:col-span-7">

            {/* Eyebrow */}
            <RevealOnScroll>
              <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-blue uppercase mb-6 font-bold">
                <span className="w-8 h-px bg-blue" />
                Tax Benefit Assistance
              </span>
            </RevealOnScroll>

            {/* Heading */}
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-bold text-white leading-[1.02] tracking-[-0.02em] text-balance mb-8">
                Section 80-IAC assistance,{' '}
                <span className="text-blue">handled with precision.</span>
              </h2>
            </RevealOnScroll>

            {/* Subtext */}
            <RevealOnScroll delay={0.2}>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
                Section 80-IAC of the Income Tax Act provides a tax holiday to eligible
                DPIIT-recognised startups. CertWinX assists with documentation, application
                preparation and coordination through the process.
              </p>
            </RevealOnScroll>

            {/* Guarantee banner */}
            <RevealOnScroll delay={0.3}>
              <div className="mb-10 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30">
                  <span className="relative flex items-center justify-center w-3 h-3">
                    <span data-guarantee-dot className="absolute inset-0 rounded-full bg-blue/60" />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-blue" />
                  </span>
                  <span className="text-sm font-bold text-white">
                    100% Professional Assistance
                  </span>
                </div>
                <span className="text-[11px] text-white/50 italic">
                  *Approval subject to IMB decision
                </span>
              </div>
            </RevealOnScroll>

            {/* Points grid */}
            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
              {POINTS.map((p, i) => (
                <li
                  key={i}
                  data-iac="point"
                  className="flex items-start gap-3 text-sm text-white/80"
                >
                  <CheckCircle2 size={15} className="text-blue mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <RevealOnScroll delay={0.4}>
              <div className="flex flex-wrap gap-3">
                <MagneticButton to="/eligibility/80-iac" variant="gold" size="lg">
                  Check 80-IAC Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
              </div>
              <p className="mt-4 text-xs text-white/50 max-w-lg leading-relaxed">
                Note: Approval is subject to Inter-Ministerial Board review and decision.
                CertWinX does not guarantee approval.
              </p>
            </RevealOnScroll>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-5">
            <RevealOnScroll delay={0.3}>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-sm">

                {/* Table */}
                <div className="space-y-4 mb-8">
                  {ROWS.map((r) => (
                    <div
                      key={r.label}
                      data-iac="row"
                      className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                    >
                      <span className="text-sm text-white/60">{r.label}</span>
                      <span className="text-sm font-bold text-blue">{r.value}</span>
                    </div>
                  ))}
                </div>

                {/* Guarantee badges */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                  {GUARANTEES.map((g, i) => (
                    <div
                      key={i}
                      data-iac="guarantee"
                      className="flex items-center gap-3 text-sm text-white/85"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue/15 border border-blue/25 flex items-center justify-center shrink-0">
                        <g.icon size={13} className="text-blue" />
                      </div>
                      <span className="font-medium">{g.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom disclaimer */}
                <div className="mt-8 p-4 rounded-2xl bg-blue/8 border border-blue/20">
                  <p className="text-xs text-white/70 leading-relaxed">
                    <strong className="text-blue font-semibold">Important:</strong>{' '}
                    CertWinX provides professional assistance only. Approval is at the sole
                    discretion of the Inter-Ministerial Board and relevant authorities.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}