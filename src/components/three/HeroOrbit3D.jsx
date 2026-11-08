import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroOrbit3D() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const b1 = root.querySelector('[data-bubble="1"]');
      const b2 = root.querySelector('[data-bubble="2"]');
      const b3 = root.querySelector('[data-bubble="3"]');
      const b4 = root.querySelector('[data-bubble="4"]');

      if (!b1 || !b2 || !b3 || !b4) return;

      gsap.set([b1, b2, b3, b4], { opacity: 0, y: 16, scale: 0.94 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });

      tl.to(b1, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.7)' })
        .to(b1, { opacity: 0.35, duration: 0.35 }, '+=1.6')
        .to(b2, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.7)' }, '-=0.1')
        .to(b2, { opacity: 0.35, duration: 0.35 }, '+=1.6')
        .to(b3, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.7)' }, '-=0.1')
        .to(b3, { opacity: 0.35, duration: 0.35 }, '+=1.6')
        .to(b4, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.1')
        .to(b4, { opacity: 1, duration: 2.2 })
        .to([b1, b2, b3, b4], { opacity: 0, y: 12, duration: 0.5, stagger: 0.05 });

      gsap.to('[data-image]', {
        y: -6,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      const onMove = (e) => {
        const rect = root.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to('[data-image]', {
          rotateY: x * 4,
          rotateX: -y * 3,
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
    <div
      ref={rootRef}
      className="relative w-full"
      aria-hidden="true"
    >
      {/* ============ MOBILE LAYOUT (< lg) ============ */}
      <div className="lg:hidden flex flex-col gap-3 py-2">
        {/* Mobile bubble 1 — Customer */}
        <div
          data-bubble="1"
          className="self-start max-w-[75%] bg-white rounded-2xl rounded-br-sm shadow-[0_10px_25px_-12px_rgba(28,131,243,0.3)] border border-line px-3.5 py-2.5"
        >
          <p className="text-[12px] leading-snug text-ink">
            <span className="font-semibold text-blue">Hi!</span> Where should I start?
          </p>
        </div>

        {/* Mobile bubble 3 — Customer */}
        <div
          data-bubble="3"
          className="self-start max-w-[75%] bg-white rounded-2xl rounded-br-sm shadow-[0_10px_25px_-12px_rgba(28,131,243,0.3)] border border-line px-3.5 py-2.5"
        >
          <p className="text-[12px] leading-snug text-ink">
            Need <span className="font-semibold text-blue">DPIIT + funding</span>.
          </p>
        </div>

        {/* Mobile bubble 2 — CertWinX */}
        <div
          data-bubble="2"
          className="self-end max-w-[75%] bg-deepblue rounded-2xl rounded-bl-sm shadow-[0_10px_25px_-12px_rgba(22,58,138,0.4)] px-3.5 py-2.5"
        >
          <p className="text-[12px] leading-snug text-white">
            Are you <span className="font-semibold text-sky">registered</span> yet?
          </p>
        </div>

        {/* Mobile bubble 4 — CertWinX */}
        <div
          data-bubble="4"
          className="self-end max-w-[80%] bg-blue-soft border border-blue/30 rounded-2xl rounded-bl-sm shadow-[0_10px_25px_-12px_rgba(28,131,243,0.25)] px-3.5 py-2.5"
        >
          <div className="flex items-start gap-1.5">
            <Check size={12} className="text-blue mt-0.5 shrink-0" strokeWidth={3} />
            <p className="text-[12px] leading-snug text-blue-deep font-semibold">
              Free eligibility assessment first.
            </p>
          </div>
        </div>

        {/* Character image */}
        <div data-image className="relative mt-2 will-change-transform">
          <picture>
            <source srcSet="/hero-characters.webp" type="image/webp" />
            <img
              src="/hero-characters.png"
              alt="CertWinX consultant guiding an entrepreneur"
              className="w-full h-auto rounded-2xl"
              loading="eager"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(28,131,243,0.12))' }}
            />
          </picture>
        </div>

        <p className="text-center text-[10px] font-semibold tracking-[0.2em] uppercase text-muted mt-2">
          Right Guidance · Real Opportunities
        </p>
      </div>

      {/* ============ DESKTOP LAYOUT (lg+) ============ */}
      <div className="hidden lg:block relative w-full h-[540px]">
        {/* Backdrop ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full bg-blue/10 blur-[100px]" />
          <div className="absolute top-[25%] left-[10%] w-[200px] h-[200px] rounded-full bg-sky/20 blur-[80px]" />
        </div>

        <div className="relative w-full h-full flex items-center justify-center pb-8">
          <div className="relative w-full max-w-[680px] mx-auto px-2">

            {/* Character image */}
            <div data-image className="relative z-10 will-change-transform">
              <picture>
                <source srcSet="/hero-characters.webp" type="image/webp" />
                <img
                  src="/hero-characters.png"
                  alt="CertWinX consultant guiding an entrepreneur"
                  className="w-full h-auto rounded-3xl"
                  loading="eager"
                  style={{ filter: 'drop-shadow(0 25px 50px rgba(22,58,138,0.12))' }}
                />
              </picture>
            </div>

            {/* CUSTOMER BUBBLES — TOP LEFT */}
            <div className="absolute -top-4 left-0 sm:-left-6 lg:-left-8 z-20 flex flex-col gap-2.5 w-[180px] sm:w-[200px]">
              <div
                data-bubble="3"
                className="relative bg-white rounded-2xl rounded-br-sm shadow-[0_16px_36px_-12px_rgba(22,58,138,0.25)] border border-line px-3.5 py-2.5"
              >
                <p className="text-[11px] leading-snug text-ink">
                  Need <span className="font-semibold text-blue">DPIIT + funding</span>.
                </p>
                <span className="absolute bottom-[-6px] right-5 w-2.5 h-2.5 bg-white border-r border-b border-line rotate-45" />
              </div>

              <div
                data-bubble="1"
                className="relative bg-white rounded-2xl rounded-br-sm shadow-[0_16px_36px_-12px_rgba(22,58,138,0.25)] border border-line px-3.5 py-2.5"
              >
                <p className="text-[11px] leading-snug text-ink">
                  <span className="font-semibold text-blue">Hi!</span> Where should I start?
                </p>
                <span className="absolute bottom-[-6px] right-5 w-2.5 h-2.5 bg-white border-r border-b border-line rotate-45" />
              </div>
            </div>

            {/* CERTWINX BUBBLES — TOP RIGHT */}
            <div className="absolute -top-4 right-0 sm:-right-6 lg:-right-8 z-20 flex flex-col gap-2.5 w-[190px] sm:w-[210px]">
              <div
                data-bubble="4"
                className="relative bg-blue-soft border border-blue/30 rounded-2xl rounded-bl-sm shadow-[0_16px_36px_-12px_rgba(28,131,243,0.3)] px-3.5 py-2.5"
              >
                <div className="flex items-start gap-1.5">
                  <Check size={12} className="text-blue mt-0.5 shrink-0" strokeWidth={3} />
                  <p className="text-[11px] leading-snug text-blue-deep font-semibold">
                    Free eligibility check first.
                  </p>
                </div>
                <span className="absolute bottom-[-6px] left-5 w-2.5 h-2.5 bg-blue-soft border-r border-b border-blue/30 rotate-45" />
              </div>

              <div
                data-bubble="2"
                className="relative bg-deepblue rounded-2xl rounded-bl-sm shadow-[0_16px_36px_-12px_rgba(22,58,138,0.4)] px-3.5 py-2.5"
              >
                <p className="text-[11px] leading-snug text-white">
                  Are you <span className="font-semibold text-sky">registered</span> yet?
                </p>
                <span className="absolute bottom-[-6px] left-5 w-2.5 h-2.5 bg-deepblue rotate-45" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted whitespace-nowrap">
            Right Guidance · Real Opportunities · Long-Term Partnership
          </p>
        </div>
      </div>
    </div>
  );
}
