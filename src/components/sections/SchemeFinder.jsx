import { useEffect, useRef } from 'react';
import { ArrowUpRight, Search, Target, ShieldCheck, Sparkles } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import MagneticButton from '../motion/MagneticButton';

const STEPS = [
  {
    icon: Search,
    label: 'Answer a few questions',
    desc: 'Quick, intuitive, no jargon',
    num: '01',
  },
  {
    icon: Target,
    label: 'Get matched opportunities',
    desc: 'Schemes that fit your profile',
    num: '02',
  },
  {
    icon: ShieldCheck,
    label: 'Request expert review',
    desc: 'Free, no-obligation guidance',
    num: '03',
  },
];

export default function SchemeFinder() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Ensure steps are visible first (safety net)
      gsap.set('[data-step]', { opacity: 1, y: 0 });

      // Reveal steps
      gsap.from('[data-step]', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          once: true,
        },
      });

      // Live dot pulse
      gsap.utils.toArray('[data-step-dot]').forEach((dot, i) => {
        gsap.to(dot, {
          scale: 1.4,
          opacity: 0.4,
          duration: 1.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
        });
      });

      // CTA glow
      gsap.to('[data-cta-glow]', {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Grid shimmer
      gsap.to('[data-grid-shimmer]', {
        backgroundPosition: '200% 0',
        duration: 15,
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
      {/* Grid shimmer */}
      <div
        data-grid-shimmer
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, rgba(45,156,255,0.3) 50%, transparent 100%), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '200% 100%, 64px 64px, 64px 64px',
        }}
      />

      {/* Blue glow blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-blue uppercase mb-6">
              <span className="w-8 h-px bg-blue" />
              Scheme Discovery
            </span>

            <h2 className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-6 text-balance">
              Not sure which <span className="text-blue">government scheme</span> fits your business?
            </h2>

            <p className="text-base lg:text-lg text-white/70 leading-relaxed mb-8 max-w-lg">
              Answer a few simple questions and discover potential schemes and services relevant
              to your business profile.
            </p>

            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/30">
              <span className="relative flex items-center justify-center w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-green-400/60 animate-ping" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-green-400" />
              </span>
              <span className="text-xs font-bold text-white tracking-wide">
                Free · No commitment · ~60 seconds
              </span>
            </div>

            <div className="relative inline-flex">
              <span
                data-cta-glow
                className="pointer-events-none absolute inset-0 rounded-full bg-blue/40 blur-2xl"
                aria-hidden="true"
              />
              <MagneticButton to="/eligibility" variant="primary" size="lg">
                <Sparkles size={15} />
                Find My Scheme
                <ArrowUpRight size={15} />
              </MagneticButton>
            </div>
          </div>

          {/* RIGHT — 3 STEPS (Guaranteed visible) */}
          <div className="lg:col-span-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 backdrop-blur-sm">
              <div className="space-y-1">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="relative">
                      {/* Connector line */}
                      {i > 0 && (
                        <div
                          className="absolute left-7 w-[calc(100%-3.5rem)] h-px bg-gradient-to-r from-blue/40 via-blue/15 to-transparent"
                          style={{ top: '-1px' }}
                        />
                      )}

                      <div
                        data-step
                        className="group flex items-center gap-5 py-4 px-3 -mx-3 rounded-2xl hover:bg-blue/8 transition-all duration-500 cursor-default"
                      >
                        {/* Icon */}
                        <div className="relative shrink-0">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue/20 to-blue/5 border border-blue/25 flex items-center justify-center transition-all duration-500 group-hover:from-blue group-hover:to-blue group-hover:border-blue group-hover:scale-105">
                            <Icon
                              size={20}
                              className="text-blue group-hover:text-white transition-colors duration-500"
                              strokeWidth={2.2}
                            />
                          </div>
                          {/* Live dot */}
                          <span
                            data-step-dot
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue border-2 border-[#0A0F1F]"
                            aria-hidden="true"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-base lg:text-lg font-bold text-white group-hover:text-blue transition-colors duration-300 mb-1">
                            {s.label}
                          </p>
                          <p className="text-xs lg:text-sm text-white/50">{s.desc}</p>
                        </div>

                        {/* Number */}
                        <span className="hidden sm:block font-display text-2xl font-bold tabular text-white/15 group-hover:text-blue/40 transition-colors duration-500 shrink-0">
                          {s.num}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom hint */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase">
                  3 Simple Steps
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-green-400">100% Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}