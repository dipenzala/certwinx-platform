import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import CounterNumber from '../motion/CounterNumber';
import RevealOnScroll from '../motion/RevealOnScroll';

const STATS = [
  {
    to: 6,
    suffix: '+ Yrs',
    label: 'Advisory Experience',
    desc: 'Institutional startup & MSME advisory since 2018',
    tone: 'blue',
  },
  {
    to: 28,
    suffix: '+',
    label: 'States & UTs Covered',
    desc: 'Pan-India startup advisory footprint',
    tone: 'ink',
  },
  {
    to: 100,
    suffix: '%',
    label: 'Procedural Transparency',
    desc: 'Direct portal submission & zero hidden fees',
    tone: 'blue',
  },
  {
    to: 24,
    suffix: ' hrs',
    label: 'Eligibility Turnaround',
    desc: 'Fast diagnostic for Section 80-IAC & grants',
    tone: 'ink',
  },
];

export default function StatsCounter() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-divider]', {
        scaleX: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative py-20 lg:py-24 bg-white border-y border-line overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-blue/5 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-sky/10 blur-[100px]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <RevealOnScroll>
          <div className="text-center mb-14 lg:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-soft border border-blue/20 text-[11px] font-semibold tracking-wider text-blue uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Execution Metrics · 6+ Years Experience
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.12] tracking-tight text-balance">
              Engineered for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1C83F3] via-[#0E60D2] to-[#0A47CC]">
                Ambition
              </span>
              . Proven by{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1C83F3] via-[#0E60D2] to-[#0A47CC]">
                Sovereign Precision
              </span>
              .
            </h2>
            <p className="mt-4 text-sm sm:text-base text-graphite max-w-2xl mx-auto leading-relaxed font-normal">
              Navigating India's most prestigious government schemes, 100% tax holidays, and statutory capital grants with zero guesswork.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 lg:gap-x-8">
          {STATS.map((s, i) => (
            <RevealOnScroll
              key={i}
              delay={i * 0.08}
              className="relative text-center lg:text-left"
            >
              {i > 0 && (
                <span
                  data-divider
                  className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-line origin-top"
                />
              )}

              <p
                className={`font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold tabular leading-none tracking-tight mb-3 ${
                  s.tone === 'blue' ? 'text-blue' : 'text-ink'
                }`}
              >
                <CounterNumber
                  to={s.to}
                  suffix={s.suffix}
                  separator={s.separator}
                />
              </p>

              <p className="text-xs font-bold tracking-wider text-ink uppercase mb-1.5">
                {s.label}
              </p>

              <p className="text-xs text-graphite leading-relaxed">
                {s.desc}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
