import { useEffect, useRef } from 'react';
import {
  Rocket,
  Building2,
  FileCheck,
  BadgeCheck,
  Landmark,
  ClipboardCheck,
  TrendingUp,
  Sparkles,
  Search,
  FileText,
  Send,
  UserCheck,
  Shield,
  Layers,
} from 'lucide-react';
import { gsap } from '../../lib/gsap';

/* 6-Pillar Structured Service Approach */
const SIX_PILLARS = [
  {
    step: '01',
    title: 'Structured Assessment',
    desc: 'Upfront eligibility check across 18+ central and state schemes before filing.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Documentation Guidance',
    desc: 'Structuring pitch decks, scalability memos, and ROC audited statements.',
    icon: FileText,
  },
  {
    step: '03',
    title: 'Application Preparation',
    desc: 'Dossier drafting aligned strictly with IMB, DPIIT, and ministry standards.',
    icon: Layers,
  },
  {
    step: '04',
    title: 'Portal Guidance',
    desc: 'Assistance submitting via official portals: NSWS, Startup India, Udyam & MCA.',
    icon: Send,
  },
  {
    step: '05',
    title: 'Professional Advisory',
    desc: 'Dedicated startup specialists for committee presentation & query resolution.',
    icon: UserCheck,
  },
  {
    step: '06',
    title: 'Transparent Engagement',
    desc: 'Zero hidden fees. Clear milestones, weekly status updates, and honest counsel.',
    icon: Shield,
  },
];

/* Core Capabilities Chips */
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
      gsap.from('[data-pillar]', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from('[data-chip]', {
        y: 12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-white border-b border-line overflow-hidden py-10 lg:py-14"
      aria-label="CertWinX Structured Service Approach"
    >
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-soft border border-blue/20 text-[10px] font-bold tracking-[0.2em] text-blue uppercase mb-3">
            <Sparkles size={11} className="text-blue" />
            CertWinX Advisory Framework
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
            A Structured, Six-Pillar Service Methodology
          </h2>
          <p className="text-xs sm:text-sm text-graphite mt-2">
            Eliminating guesswork with transparent milestones, rigorous documentation, and direct portal alignment.
          </p>
        </div>

        {/* The 6 Pillars Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-10">
          {SIX_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.step}
                data-pillar
                className="group relative bg-canvas border border-line rounded-2xl p-4 hover:border-blue/30 hover:bg-blue-soft/30 hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold text-blue tracking-wider font-mono">
                      {p.step}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-blue-soft text-blue flex items-center justify-center group-hover:bg-blue group-hover:text-white transition-colors">
                      <Icon size={14} />
                    </div>
                  </div>
                  <h3 className="font-display text-xs sm:text-sm font-bold text-ink group-hover:text-blue transition-colors leading-snug mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-[11px] text-graphite leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Capabilities Marquee / Chips */}
        <div className="pt-6 border-t border-line/70">
          <p className="text-center text-[10px] font-bold tracking-[0.2em] uppercase text-muted mb-4">
            Core Advisory Capabilities & Coverage
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  data-chip
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-canvas border border-line hover:border-blue/30 hover:bg-blue-soft/40 transition-colors"
                >
                  <span className="w-5 h-5 rounded-md bg-blue-soft text-blue flex items-center justify-center shrink-0">
                    <Icon size={12} strokeWidth={2.2} />
                  </span>
                  <span className="text-[11px] font-semibold text-ink group-hover:text-blue transition-colors whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
