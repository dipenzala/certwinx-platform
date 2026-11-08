import { useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, FileCheck, Zap, Award, Sparkles, Building2, Calendar, Percent } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import MagneticButton from '../motion/MagneticButton';
import RevealOnScroll from '../motion/RevealOnScroll';

const POINTS = [
  'DPIIT Recognition as strict mandatory prerequisite',
  'Private Limited or LLP incorporated after 1 April 2016',
  'Turnover under ₹100 Cr in any preceding financial year',
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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-iac="row"]', {
        y: 16,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });

      gsap.from('[data-iac="point"]', {
        x: -10,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
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
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN: INTEL & STRATEGY */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-soft border border-blue/20 text-blue font-semibold text-[11px] tracking-wider uppercase mb-5">
                <Sparkles size={12} className="text-blue" />
                Startup Taxation Intelligence
              </div>
            </RevealOnScroll>

            {/* Heading */}
            <RevealOnScroll delay={0.1}>
              <h2 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold text-ink leading-[1.08] tracking-[-0.03em] text-balance mb-6">
                Section 80-IAC tax exemption,{' '}
                <span className="text-blue">handled with precision.</span>
              </h2>
            </RevealOnScroll>

            {/* Subtext */}
            <RevealOnScroll delay={0.2}>
              <p className="text-base sm:text-lg text-graphite leading-relaxed max-w-2xl mb-8">
                Section 80-IAC of the Income Tax Act provides eligible DPIIT-recognised startups with a 100% tax holiday on business profits for three consecutive assessment years. CertWinX coordinates your application dossier from initial eligibility through IMB committee presentation.
              </p>
            </RevealOnScroll>

            {/* Credibility strip */}
            <RevealOnScroll delay={0.25}>
              <div className="mb-8 p-4 rounded-2xl bg-paper border border-line shadow-sm flex items-start sm:items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                </div>
                <div className="text-xs text-graphite leading-relaxed">
                  <span className="font-bold text-ink">Comprehensive IMB Dossier Preparation:</span> We structure your pitch deck, innovation scalability write-up, audited financials, and direct patent/IP links to satisfy the Inter-Ministerial Board criteria.
                </div>
              </div>
            </RevealOnScroll>

            {/* Key Evaluation Parameters */}
            <h3 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4">
              Key Statutory Prerequisites & Advisory Scope:
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
              {POINTS.map((p, i) => (
                <li
                  key={i}
                  data-iac="point"
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-graphite bg-paper border border-line rounded-xl p-3"
                >
                  <CheckCircle2 size={15} className="text-blue mt-0.5 shrink-0" />
                  <span className="leading-snug">{p}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <RevealOnScroll delay={0.35}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton to="/eligibility/80-iac" variant="primary" size="lg">
                  Check 80-IAC Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
                <MagneticButton to="/services/section-80-iac" variant="outline" size="lg">
                  Read Full 80-IAC Guide
                </MagneticButton>
              </div>
              <p className="mt-4 text-xs text-muted max-w-lg leading-relaxed">
                *Statutory note: Approval under Section 80-IAC is granted at the sole discretion of the Inter-Ministerial Board (IMB). CertWinX provides advisory, document structuring and filing assistance.
              </p>
            </RevealOnScroll>
          </div>

          {/* RIGHT COLUMN: TAX BENEFIT MATRIX CARD */}
          <div className="lg:col-span-5">
            <RevealOnScroll delay={0.2}>
              <div className="bg-paper border border-line rounded-3xl p-6 sm:p-8 lg:p-9 shadow-card">
                
                <div className="flex items-center justify-between pb-5 border-b border-line mb-6">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-blue uppercase">Statutory Matrix</span>
                    <h4 className="font-display text-lg font-bold text-ink">Section 80-IAC Snapshot</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                    Active Scheme
                  </span>
                </div>

                {/* Rows */}
                <div className="space-y-4 mb-8">
                  {ROWS.map((r) => (
                    <div
                      key={r.label}
                      data-iac="row"
                      className="p-3.5 rounded-xl bg-canvas border border-line/80 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-soft text-blue flex items-center justify-center shrink-0 mt-0.5">
                        <r.icon size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-muted uppercase tracking-wider">{r.label}</p>
                        <p className="text-xs sm:text-sm font-bold text-ink leading-snug mt-0.5">{r.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Statutory Guarantee note */}
                <div className="p-4 rounded-2xl bg-blue-soft/50 border border-blue/20">
                  <p className="text-xs text-graphite leading-relaxed">
                    <strong className="text-blue-deep font-semibold">100% Tax Relief:</strong> Unlike ordinary deductions, Section 80-IAC exempts eligible startups from 100% of income tax on profits, creating substantial non-dilutive liquidity to reinvest in hiring, R&D, and expansion.
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
