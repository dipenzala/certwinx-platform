import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import CounterNumber from '../motion/CounterNumber';
import RevealOnScroll from '../motion/RevealOnScroll';

const STATS = [
  {
    to: 250,
    suffix: '+',
    label: 'Services Offered',
    desc: 'From registration to funding',
    tone: 'ink',
  },
  {
    to: 160,
    suffix: '+',
    label: 'Schemes Mapped',
    desc: 'Central & state schemes',
    tone: 'blue',
  },
  {
    to: 8927,
    suffix: '+',
    label: 'Clients Served',
    desc: 'Trusted across India',
    tone: 'ink',
    separator: true,
  },
  {
    to: 99,
    suffix: '%',
    label: 'Success Ratio',
    desc: 'Consistent outcomes',
    tone: 'blue',
  },
];

export default function StatsCounter() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.to('[data-live-dot]', {
        scale: 1.5,
        opacity: 0.3,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.from('[data-divider]', {
        scaleX: 0,
        duration: 1.4,
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
      className="relative py-20 lg:py-28 bg-white border-y border-line overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-blue/5 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-blue/5 blur-[100px]" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">

        <RevealOnScroll>
          <div className="text-center mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-line text-[10px] font-bold tracking-[0.25em] text-ink/70 uppercase mb-5">
              <span className="relative flex items-center justify-center w-2 h-2">
                <span data-live-dot className="absolute inset-0 rounded-full bg-green-500/40" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-green-500" />
              </span>
              By the Numbers
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.1] tracking-tight">
              Built on <span className="text-blue">structure</span>. Trusted for{' '}
              <span className="text-blue">results</span>.
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 lg:gap-x-8">
          {STATS.map((s, i) => (
            <RevealOnScroll
              key={i}
              delay={i * 0.1}
              className="relative text-center lg:text-left"
            >
              {i > 0 && (
                <span
                  data-divider
                  className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-line to-transparent origin-top"
                />
              )}

              <p
                className={`font-display text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-bold tabular leading-none tracking-tight mb-4 ${
                  s.tone === 'blue' ? 'text-blue' : 'text-ink'
                }`}
              >
                <CounterNumber
                  to={s.to}
                  suffix={s.suffix}
                  separator={s.separator}
                />
              </p>

              <p className="text-[11px] lg:text-[12px] font-bold tracking-[0.2em] text-ink uppercase mb-2">
                {s.label}
              </p>

              <p className="text-xs lg:text-sm text-muted leading-relaxed">
                {s.desc}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}