import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import CounterNumber from '../motion/CounterNumber';
import RevealOnScroll from '../motion/RevealOnScroll';

const STATS = [
  {
    to: 16,
    suffix: '+',
    label: 'Priority Schemes Mapped',
    desc: 'Central & State funding & incentive programs',
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
    desc: 'Direct portal submission & clear documentation',
    tone: 'blue',
  },
  {
    to: 24,
    suffix: ' hrs',
    label: 'Initial Advisory Response',
    desc: 'Fast preliminary eligibility assessment',
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
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Verified Execution Metrics
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.1] tracking-tight">
              Built on <span className="text-blue">structure</span>. Trusted for{' '}
              <span className="text-blue">rigor</span>.
            </h2>
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
                className={`font-display text-[3rem] sm:text-[4rem] lg:text-[4.75rem] font-bold tabular leading-none tracking-tight mb-3 ${
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
