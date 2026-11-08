import { useEffect, useRef } from 'react';
import {
  Rocket, Building2, FileCheck, BadgeCheck, Landmark, ClipboardCheck, TrendingUp, Sparkles,
} from 'lucide-react';
import { gsap } from '../../lib/gsap';

const ITEMS = [
  { icon: Rocket, label: 'Startup India & DPIIT' },
  { icon: Landmark, label: 'Section 80-IAC Tax Exemption' },
  { icon: Building2, label: 'Udyam / MSME Registration' },
  { icon: BadgeCheck, label: 'ISO & ZED Certifications' },
  { icon: TrendingUp, label: 'Seed Fund & Capital Grants' },
  { icon: FileCheck, label: 'Company & LLP Registration' },
  { icon: ClipboardCheck, label: 'Corporate Statutory Compliance' },
];

export default function TrustStrip() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-item]', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 88%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-white border-b border-line overflow-hidden py-6 lg:py-8"
      aria-label="Core Advisory Capabilities"
    >
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Subtle label */}
        <div className="text-center mb-5">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-muted uppercase">
            <Sparkles size={11} className="text-blue" />
            End-To-End Advisory Ecosystem
          </span>
        </div>

        {/* Capability Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                data-item
                className="group flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-canvas border border-line hover:border-blue/30 hover:bg-blue-soft/50 hover:shadow-sm transition-all duration-200"
              >
                <span className="w-8 h-8 rounded-xl bg-blue-soft text-blue flex items-center justify-center shrink-0 group-hover:bg-blue group-hover:text-white transition-colors">
                  <Icon size={15} strokeWidth={2.2} />
                </span>

                <span className="text-xs font-semibold text-ink group-hover:text-blue transition-colors whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
