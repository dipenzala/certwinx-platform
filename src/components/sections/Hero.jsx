import { useEffect, useRef } from 'react';
import { ArrowUpRight, MessageCircle, Sparkles, Compass, CheckCircle2, Award, Check } from 'lucide-react';
import { gsap, SplitText } from '../../lib/gsap';
import { getWhatsAppLink } from '../../lib/constants';
import MagneticButton from '../motion/MagneticButton';
import LiveBackground from '../motion/LiveBackground';
import HeroOrbit3D from '../three/HeroOrbit3D';

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    let split;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });

      tl.from('[data-hero="badge"]', { y: 20, opacity: 0, duration: 0.8 });

      const headline = root.querySelector('[data-hero="headline"]');
      if (headline && document.fonts?.ready) {
        document.fonts.ready.then(() => {
          split = new SplitText(headline, { type: 'lines', linesClass: 'split-line' });
          gsap.set(split.lines, { yPercent: 110 });
          gsap.to(split.lines, {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: 'expo.out',
            delay: 0.25,
          });
        });
      }

      tl.from('[data-hero="sub"]', { y: 20, opacity: 0, duration: 0.9 }, 0.8);
      tl.from('[data-hero="cta"]', { y: 20, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.95);
      tl.from('[data-hero="visual"]', { scale: 0.96, opacity: 0, duration: 1.2 }, 0.4);
      tl.from('[data-hero="trust"]', { y: 16, opacity: 0, duration: 0.8 }, 1.15);
    }, root);

    return () => {
      ctx.revert();
      if (split) split.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 overflow-hidden bg-canvas"
    >
      <LiveBackground />

      <div className="relative max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* LEFT: ENTERPRISE COPY & CTAs (Exact Live Site Image 4 Alignment) */}
          <div className="lg:col-span-6 xl:col-span-6 relative z-10">
            {/* Tagline / Category Eyebrow */}
            <div data-hero="badge" className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-line shadow-xs text-[10px] sm:text-[11px] font-bold tracking-wider text-blue uppercase">
                <span className="text-blue font-mono font-bold">//</span>
                <span>BUSINESS · STARTUP · GOVERNMENT SERVICES</span>
              </span>
            </div>

            {/* Headline (Matching Live Site Image 4) */}
            <h1
              data-hero="headline"
              className="font-display text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] xl:text-[3.75rem] font-bold leading-[1.08] tracking-[-0.03em] text-ink text-balance"
            >
              Grow Your Business
              <br />
              <span className="text-blue">With Government Support.</span>
            </h1>

            {/* Supporting Text (Matching Live Site Image 4) */}
            <p
              data-hero="sub"
              className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-graphite leading-relaxed max-w-2xl font-normal"
            >
              DPIIT recognition, Section 80 IAC, Udyam / MSME registration, government schemes and funding — one partner, end-to-end.
            </p>

            {/* CTAs (Matching Live Site Image 4: Check My Eligibility, Talk to an Expert, WhatsApp) */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <span data-hero="cta" className="w-full sm:w-auto">
                <MagneticButton to="/eligibility" variant="primary" size="lg" className="w-full sm:w-auto justify-center min-h-[46px]">
                  Check My Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
              </span>
              <span data-hero="cta" className="w-full sm:w-auto">
                <MagneticButton to="/contact" variant="outline" size="lg" className="w-full sm:w-auto justify-center min-h-[46px]">
                  Talk to an Expert
                </MagneticButton>
              </span>
              <span data-hero="cta" className="w-full sm:w-auto">
                <MagneticButton href={getWhatsAppLink('startup advisory')} variant="whatsapp" size="lg" className="w-full sm:w-auto justify-center min-h-[46px]">
                  <MessageCircle size={15} /> WhatsApp
                </MagneticButton>
              </span>
            </div>

            {/* Genuine Trust Anchors (Matching Live Site Image 4) */}
            <div data-hero="trust" className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-line/80 flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-blue shrink-0" strokeWidth={2.5} />
                <p className="text-xs font-medium text-graphite">Transparent process</p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-blue shrink-0" />
                <p className="text-xs font-medium text-graphite">No advance professional fees*</p>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-blue shrink-0" />
                <p className="text-xs font-medium text-graphite">6+ Years Advisory Experience</p>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE ADVISORY VISUAL (Matching Live Site Image 4) */}
          <div data-hero="visual" className="lg:col-span-6 xl:col-span-6 relative mt-4 lg:mt-0 max-w-full overflow-hidden sm:overflow-visible">
            <div className="absolute inset-0 -m-6 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[380px] h-[340px] sm:h-[380px] rounded-full bg-blue/10 blur-[100px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[260px] h-[240px] sm:h-[260px] rounded-full bg-sky/20 blur-[80px]" />
            </div>
            <HeroOrbit3D />
          </div>
        </div>
      </div>
    </section>
  );
}
