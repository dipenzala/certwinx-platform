import { useEffect, useRef } from 'react';
import { CheckCircle2, FileCheck, ShieldCheck } from 'lucide-react';
import { gsap } from '../../lib/gsap';

/* ============ CURATED OFFICIAL GAZETTE NOTIFIED 80-IAC RECIPIENTS ============ */
const NOTIFIED_STARTUPS = [
  { name: 'RNT HEALTH INSIGHTS PRIVATE LIMITED', sector: 'Healthcare AI' },
  { name: 'TROY CONSULTING PRIVATE LIMITED', sector: 'Enterprise Tech' },
  { name: 'GENEBIO HEALTHCARE PRIVATE LIMITED', sector: 'Biotech' },
  { name: 'BHANU PV SOLAR PRIVATE LIMITED', sector: 'Clean Energy' },
  { name: 'INSTRON TECHNOLOGIES LLP', sector: 'Industrial Automation' },
  { name: 'PROMPT INNOVATIONS PRIVATE LIMITED', sector: 'AgriTech' },
  { name: 'WEBKORPS SERVICES INDIA PRIVATE LIMITED', sector: 'Cloud Software' },
  { name: 'AUXOBIT AEROSPACE PRIVATE LIMITED', sector: 'Aerospace Tech' },
  { name: 'CERO SMART MOBILITY PRIVATE LIMITED', sector: 'Electric Mobility' },
  { name: 'LITPAX TECHNOLOGY PRIVATE LIMITED', sector: 'Energy Storage' },
  { name: 'MUTESEAL ACOUSTICS PRIVATE LIMITED', sector: 'Advanced Materials' },
  { name: 'JEH AEROSPACE PRIVATE LIMITED', sector: 'Defense & Aerospace' },
  { name: 'EDRIFT ELECTRIC PRIVATE LIMITED', sector: 'Clean Transportation' },
  { name: 'KYARI INNOVATIONS PRIVATE LIMITED', sector: 'Agri Innovation' },
];

export default function CertificateTicker() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const ctx = gsap.context(() => {
      const halfWidth = track.scrollWidth / 2;

      // Slow, stately scroll: 65s for full cycle ensures names are legible
      tweenRef.current = gsap.to(track, {
        x: -halfWidth,
        duration: 65,
        ease: 'none',
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) tweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) tweenRef.current.resume();
  };

  const loopItems = [...NOTIFIED_STARTUPS, ...NOTIFIED_STARTUPS];

  return (
    <section
      ref={rootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      className="relative bg-deepblue border-y border-white/10 overflow-hidden py-3 group cursor-default outline-none focus:ring-1 focus:ring-sky"
      aria-label="Public Gazette Ecosystem Startups - Section 80-IAC Inter-Ministerial Board Approved Startups"
    >
      <div className="relative flex items-center gap-4 sm:gap-6 px-4 sm:px-8">
        {/* Left Badge */}
        <div className="shrink-0 z-10 flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
          <ShieldCheck size={16} className="text-sky shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-sky uppercase tracking-wider">
              Central Gazette Record
            </span>
            <span className="text-[11px] font-bold text-white whitespace-nowrap">
              Section 80-IAC IMB Approved
            </span>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="w-px h-6 bg-white/20 shrink-0 hidden sm:block" />

        {/* Marquee Track with gradient edge masks */}
        <div className="flex-1 relative overflow-hidden min-w-0">
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-deepblue to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-deepblue to-transparent" />

          <div
            ref={trackRef}
            className="flex items-center will-change-transform"
            style={{ width: 'max-content' }}
          >
            {loopItems.map((startup, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0 pr-10">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={10} className="text-emerald-400" strokeWidth={2.5} />
                </span>

                <span className="text-xs font-semibold tracking-wide text-white/95 whitespace-nowrap">
                  {startup.name}
                </span>

                <span className="text-[10px] font-medium text-sky/90 whitespace-nowrap bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                  {startup.sector}
                </span>

                <span className="w-1.5 h-1.5 rounded-full bg-white/25 shrink-0 ml-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Pause hint indicator */}
        <div className="shrink-0 hidden md:block text-[10px] font-medium text-white/50 tracking-wider uppercase">
          Hover to pause
        </div>
      </div>
    </section>
  );
}
