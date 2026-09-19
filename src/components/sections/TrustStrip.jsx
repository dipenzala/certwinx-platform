import { useEffect, useRef } from 'react';
import {
  Rocket,
  Building2,
  FileCheck,
  BadgeCheck,
  Landmark,
  ClipboardCheck,
  TrendingUp,
} from 'lucide-react';
import { gsap } from '../../lib/gsap';

const ITEMS = [
  { icon: Rocket, label: 'Startup' },
  { icon: Building2, label: 'MSME' },
  { icon: FileCheck, label: 'Registration' },
  { icon: BadgeCheck, label: 'Certification' },
  { icon: Landmark, label: 'Funding' },
  { icon: ClipboardCheck, label: 'Compliance' },
  { icon: TrendingUp, label: 'Business Growth' },
];

export default function TrustStrip() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Reveal items on scroll
      gsap.from('[data-item]', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 88%',
          once: true,
        },
      });

      // Icon float
      gsap.utils.toArray('[data-item-icon]').forEach((icon, i) => {
        gsap.to(icon, {
          y: -3,
          duration: 1.8 + i * 0.1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        });
      });

      // Animated top + bottom gradient lines (blue shimmer)
      gsap.utils.toArray('[data-line]').forEach((line) => {
        gsap.to(line, {
          backgroundPosition: '200% 0',
          duration: 6,
          ease: 'none',
          repeat: -1,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-[#0A0F1F] border-y border-blue/15 overflow-hidden py-10 lg:py-12"
    >
      {/* ============ BACKGROUND ============ */}
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle blue glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-blue/12 blur-[90px]" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-blue/8 blur-[90px]" />
      </div>

      {/* Floating particles */}
      {[
        { top: '20%', left: '5%', size: 2 },
        { top: '70%', left: '95%', size: 2 },
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

      {/* ============ ANIMATED TOP GRADIENT LINE ============ */}
      <div
        data-line
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #1683FF 25%, #5CB8FF 50%, #1683FF 75%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />

      {/* ============ CONTENT ============ */}
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">

        {/* Label */}
        <div className="text-center mb-7">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">
            <span className="w-6 h-px bg-blue/50" />
            Helping Businesses Across
            <span className="w-6 h-px bg-blue/50" />
          </span>
        </div>

        {/* Items grid */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-5">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                data-item
                className="group relative flex items-center gap-2.5 cursor-pointer"
              >
                {/* Icon container */}
                <span
                  data-item-icon
                  className="relative shrink-0 w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-blue/12 border border-blue/25 flex items-center justify-center transition-all duration-500 group-hover:bg-blue group-hover:border-blue group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(22,131,255,0.6)] will-change-transform"
                >
                  <Icon
                    size={16}
                    strokeWidth={2.2}
                    className="text-blue transition-colors duration-500 group-hover:text-white"
                  />
                </span>

                {/* Label */}
                <span className="text-[13px] lg:text-[14px] font-bold tracking-tight whitespace-nowrap text-white/85 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>

                {/* Underline on hover */}
                <span className="pointer-events-none absolute -bottom-2 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-blue" />
              </div>
            );
          })}
        </div>
      </div>

      {/* ============ ANIMATED BOTTOM GRADIENT LINE ============ */}
      <div
        data-line
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #5CB8FF 25%, #1683FF 50%, #5CB8FF 75%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </section>
  );
}