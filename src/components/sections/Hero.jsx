import { useEffect, useRef } from 'react';
import { ArrowUpRight, MessageCircle, ShieldCheck, Zap, Sparkles } from 'lucide-react';
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

      tl.from('[data-hero="badge"]', { y: 20, opacity: 0, duration: 0.9 });

      const headline = root.querySelector('[data-hero="headline"]');
      if (headline && document.fonts?.ready) {
        document.fonts.ready.then(() => {
          split = new SplitText(headline, { type: 'lines', linesClass: 'split-line' });
          gsap.set(split.lines, { yPercent: 110 });
          gsap.to(split.lines, {
            yPercent: 0,
            duration: 1.3,
            stagger: 0.08,
            ease: 'expo.out',
            delay: 0.35,
          });
        });
      }

      tl.from('[data-hero="sub"]', { y: 24, opacity: 0, duration: 1 }, 0.9);
      tl.from('[data-hero="cta"]', { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 1.05);
      tl.from('[data-hero="visual"]', { scale: 0.94, opacity: 0, duration: 1.4 }, 0.5);
      tl.from('[data-hero="trust"]', { y: 20, opacity: 0, duration: 0.9 }, 1.3);
    }, root);

    return () => {
      ctx.revert();
      if (split) split.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative pt-28 lg:pt-32 pb-12 overflow-hidden"
    >
      <LiveBackground />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* LEFT */}
          <div className="lg:col-span-6 relative z-10">
            <div data-hero="badge" className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-line text-[10px] font-semibold tracking-[0.2em] text-ink/80 uppercase">
                <Sparkles size={11} className="text-blue" />
                Business · Startup · Government Services
              </span>
            </div>

            <h1
              data-hero="headline"
              className="font-display text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] xl:text-[3.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink text-balance"
            >
              Grow Your Business
              <br />
              <span className="text-blue">With Government Support.</span>
            </h1>

            <p
              data-hero="sub"
              className="mt-5 text-[15px] lg:text-base text-graphite leading-relaxed max-w-lg"
            >
              DPIIT recognition, Section 80-IAC, Udyam / MSME registration, government schemes and
              funding — <span className="text-ink font-semibold">one partner, end-to-end.</span>
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span data-hero="cta">
                <MagneticButton to="/eligibility" variant="primary" size="lg">
                  Check My Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
              </span>
              <span data-hero="cta">
                <MagneticButton to="/consultation" variant="outline" size="lg">
                  Talk to an Expert
                </MagneticButton>
              </span>
              <span data-hero="cta">
                <MagneticButton href={getWhatsAppLink()} variant="whatsapp" size="lg">
                  <MessageCircle size={15} /> WhatsApp
                </MagneticButton>
              </span>
            </div>

            <div data-hero="trust" className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-blue shrink-0" />
                <p className="text-xs text-graphite">Transparent process</p>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={13} className="text-blue shrink-0" />
                <p className="text-xs text-graphite">No advance professional fees*</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Character visual */}
          <div data-hero="visual" className="lg:col-span-6 relative">
            <div className="absolute inset-0 -m-8 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-sky/15 blur-[110px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-blue/8 blur-[80px]" />
            </div>
            <HeroOrbit3D />
          </div>
        </div>
      </div>
    </section>
  );
}