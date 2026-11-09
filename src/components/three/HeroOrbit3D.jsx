import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { Check } from 'lucide-react';

export default function HeroOrbit3D() {
  const rootRef = useRef(null);

  // Conversational dialogue step (0 to 3) for live alternating speech highlight
  const [dialogueStep, setDialogueStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDialogueStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Floating gentle breathing micro-motion for characters
      gsap.to('[data-image]', {
        y: -5,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Subtle 3D perspective on mouse move
      const onMove = (e) => {
        const rect = root.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to('[data-image]', {
          rotateY: x * 3.5,
          rotateX: -y * 2.5,
          duration: 1.2,
          ease: 'power3.out',
          transformPerspective: 1200,
        });
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative w-full max-w-full overflow-hidden sm:overflow-visible">
      {/* Mobile Layout (< lg) — Speech bubbles placed above characters */}
      <div className="lg:hidden flex flex-col gap-2 py-1">
        <div className="flex flex-col gap-2 mb-2 px-1">
          <div
            className={`self-start max-w-[85%] bg-white rounded-2xl rounded-br-xs shadow-xs border px-3.5 py-2 transition-all duration-300 ${
              dialogueStep === 0 || dialogueStep === 1
                ? 'border-[#1C83F3] shadow-[0_4px_16px_rgba(28,131,243,0.18)]'
                : 'border-line opacity-90'
            }`}
          >
            <p className="text-xs font-semibold leading-snug text-ink">
              {dialogueStep === 0 ? 'Hi! Where should I start?' : 'Need DPIIT + funding.'}
            </p>
          </div>

          <div
            className={`self-end max-w-[88%] rounded-2xl rounded-bl-xs shadow-xs px-3.5 py-2 transition-all duration-300 ${
              dialogueStep === 2
                ? 'bg-[#1C83F3] text-white shadow-[0_4px_16px_rgba(28,131,243,0.25)]'
                : 'bg-[#F2E8CF] text-[#6B4F1D] border border-[#E0D2AC]'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {dialogueStep === 3 && <Check size={12} className="text-[#6B4F1D] shrink-0" strokeWidth={3} />}
              <p className="text-xs font-bold leading-snug">
                {dialogueStep === 2 ? 'Are you registered yet?' : 'Free eligibility first.'}
              </p>
            </div>
          </div>
        </div>

        {/* Character Image */}
        <div data-image className="relative will-change-transform max-w-[340px] sm:max-w-[400px] mx-auto">
          <picture>
            <source srcSet="/hero-characters.webp" type="image/webp" />
            <img
              src="/hero-characters.png"
              alt="CertWinX consultant guiding an entrepreneur"
              className="w-full h-auto rounded-2xl max-h-[260px] object-contain mx-auto"
              loading="eager"
              style={{ filter: 'drop-shadow(0 15px 30px rgba(28,131,243,0.14))' }}
            />
          </picture>
        </div>
      </div>

      {/* Desktop Layout (lg+) — ZERO FACE OVERLAP: Speech bubbles sit strictly ABOVE heads */}
      <div className="hidden lg:block relative w-full h-[510px]">
        {/* Ambient Backing Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#1C83F3]/10 blur-[100px]" />
          <div className="absolute top-[20%] left-[10%] w-[180px] h-[180px] rounded-full bg-sky/20 blur-[80px]" />
        </div>

        <div className="relative w-full h-full flex items-center justify-center pb-2">
          <div className="relative w-full max-w-[620px] mx-auto">

            {/* Character 3D illustration — with top margin so heads are strictly below the speech bubbles */}
            <div data-image className="relative z-10 will-change-transform pt-20 xl:pt-24">
              <picture>
                <source srcSet="/hero-characters.webp" type="image/webp" />
                <img
                  src="/hero-characters.png"
                  alt="CertWinX consultant guiding an entrepreneur"
                  className="w-full h-auto rounded-3xl max-h-[385px] object-contain mx-auto"
                  loading="eager"
                  style={{ filter: 'drop-shadow(0 20px 45px rgba(22,58,138,0.14))' }}
                />
              </picture>
            </div>

            {/* =======================================================
                SPEECH BUBBLES: LEFT FOUNDER (Positioned ABOVE Founder's head)
                Bubble 1: "Need DPIIT + funding."
                Bubble 2: "Hi! Where should I start?"
               ======================================================= */}
            <div className="absolute top-0 left-0 xl:-left-3 z-20 flex flex-col gap-2 max-w-[200px]">
              {/* Bubble 1: Need DPIIT + funding */}
              <div
                data-bubble="1"
                className={`relative bg-white/98 backdrop-blur-sm rounded-2xl rounded-br-xs shadow-[0_10px_25px_-5px_rgba(22,58,138,0.15)] border px-3.5 py-2 transition-all duration-300 ${
                  dialogueStep === 1
                    ? 'border-[#1C83F3] ring-2 ring-[#1C83F3]/25 shadow-[0_12px_28px_rgba(28,131,243,0.25)] scale-102'
                    : 'border-line/80'
                }`}
              >
                <p className="text-xs font-semibold leading-snug text-ink">
                  Need <span className="text-[#1C83F3] font-bold">DPIIT + funding</span>.
                </p>
                {/* Pointer */}
                <span className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-white border-r border-b border-line/80 rotate-45" />
              </div>

              {/* Bubble 2: Hi! Where should I start? */}
              <div
                data-bubble="2"
                className={`relative bg-white/98 backdrop-blur-sm rounded-2xl rounded-br-xs shadow-[0_10px_25px_-5px_rgba(22,58,138,0.15)] border px-3.5 py-2 transition-all duration-300 ${
                  dialogueStep === 0
                    ? 'border-[#1C83F3] ring-2 ring-[#1C83F3]/25 shadow-[0_12px_28px_rgba(28,131,243,0.25)] scale-102'
                    : 'border-line/80'
                }`}
              >
                <p className="text-xs font-semibold leading-snug text-ink">
                  Hi! Where should I start?
                </p>
                {/* Pointer */}
                <span className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-white border-r border-b border-line/80 rotate-45" />
              </div>
            </div>

            {/* =======================================================
                SPEECH BUBBLES: RIGHT ADVISOR (Positioned ABOVE Advisor's head)
                Bubble 3: "✓ Free eligibility first." (Golden / amber badge)
                Bubble 4: "Are you registered yet?" (Royal blue gradient bubble)
               ======================================================= */}
            <div className="absolute top-0 right-0 xl:-right-3 z-20 flex flex-col gap-2 max-w-[200px]">
              {/* Bubble 3: Free eligibility first (Golden badge matching Live Site Image 4) */}
              <div
                data-bubble="3"
                className={`relative bg-[#E8C582]/35 border border-[#D4A373]/50 rounded-2xl rounded-bl-xs shadow-[0_10px_25px_-5px_rgba(180,120,40,0.15)] px-3.5 py-2 transition-all duration-300 ${
                  dialogueStep === 3
                    ? 'ring-2 ring-[#C69255]/40 shadow-[0_12px_28px_rgba(198,146,85,0.3)] scale-102'
                    : ''
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Check size={13} className="text-[#7A531C] shrink-0" strokeWidth={3} />
                  <p className="text-xs font-bold leading-snug text-[#5A3C0E]">
                    Free eligibility first.
                  </p>
                </div>
                {/* Pointer */}
                <span className="absolute -bottom-1.5 left-6 w-2.5 h-2.5 bg-[#E8C582]/40 border-r border-b border-[#D4A373]/50 rotate-45" />
              </div>

              {/* Bubble 4: Are you registered yet? (Royal Blue bubble matching Live Site Image 4) */}
              <div
                data-bubble="4"
                className={`relative bg-gradient-to-r from-[#1C83F3] to-[#0A47CC] text-white rounded-2xl rounded-bl-xs shadow-[0_10px_25px_-5px_rgba(28,131,243,0.35)] px-3.5 py-2 transition-all duration-300 ${
                  dialogueStep === 2
                    ? 'ring-2 ring-white/50 shadow-[0_12px_30px_rgba(28,131,243,0.5)] scale-102'
                    : 'opacity-95'
                }`}
              >
                <p className="text-xs font-medium leading-snug">
                  Are you <span className="font-bold underline decoration-sky/70">registered</span> yet?
                </p>
                {/* Pointer */}
                <span className="absolute -bottom-1.5 left-6 w-2.5 h-2.5 bg-[#0A47CC] rotate-45" />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Baseline Trust Indicator (Matching Live Site Image 4) */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted/75 whitespace-nowrap">
            RIGHT GUIDANCE · REAL OPPORTUNITIES · LONG-TERM PARTNERSHIP
          </p>
        </div>
      </div>
    </div>
  );
}
