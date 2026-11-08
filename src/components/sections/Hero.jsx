import { useEffect, useRef } from 'react';
import { ArrowUpRight, MessageCircle, ShieldCheck, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
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
      className="relative pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 overflow-hidden bg-canvas"
    >
      <LiveBackground />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* LEFT: ENTERPRISE COPY & CTAs */}
          <div className="lg:col-span-7 relative z-10">
            {/* Tagline Badge */}
            <div data-hero="badge" className="mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/95 backdrop-blur-sm border border-line shadow-xs text-[10px] sm:text-[11px] font-bold tracking-wide sm:tracking-wider text-blue uppercase max-w-full">
                <Sparkles size={12} className="text-blue shrink-0" />
                <span className="truncate">AAPKI TARAKKI KA SAATHI · BHAROSHA APKA, JIMMEDARI HUMARI</span>
              </span>
            </div>

            {/* Official Headline */}
            <h1
              data-hero="headline"
              className="font-display text-[1.85rem] sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[3.75rem] font-bold leading-[1.12] sm:leading-[1.08] tracking-[-0.03em] text-ink text-balance"
            >
              Build Your Business.
              <br />
              <span className="text-blue">Unlock India's Growth Opportunities.</span>
            </h1>

            {/* Official Supporting Text */}
            <p
              data-hero="sub"
              className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-graphite leading-relaxed max-w-2xl font-normal"
            >
              From business registration and DPIIT recognition to government incentives, funding opportunities and statutory compliance — CertWinX helps businesses navigate every stage of growth.
            </p>

            {/* Primary & Secondary CTAs (Responsive Mobile Stack) */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <span data-hero="cta" className="w-full sm:w-auto">
                <MagneticButton to="/schemes" variant="primary" size="lg" className="w-full sm:w-auto justify-center min-h-[46px]">
                  <Compass size={16} /> Explore Government Schemes
                </MagneticButton>
              </span>
              <span data-hero="cta" className="w-full sm:w-auto">
                <MagneticButton href={getWhatsAppLink('startup advisory')} variant="whatsapp" size="lg" className="w-full sm:w-auto justify-center min-h-[46px]">
                  <MessageCircle size={15} /> Talk to an Advisor
                </MagneticButton>
              </span>
              <span data-hero="cta" className="w-full sm:w-auto">
                <MagneticButton to="/eligibility" variant="outline" size="lg" className="w-full sm:w-auto justify-center min-h-[46px]">
                  Check Eligibility <ArrowUpRight size={15} />
                </MagneticButton>
              </span>
            </div>

            {/* Genuine Trust Anchors */}
            <div data-hero="trust" className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-line/80 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-8 gap-y-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <p className="text-xs font-medium text-graphite">Official Portal Submission Support</p>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-blue shrink-0" />
                <p className="text-xs font-medium text-graphite">Transparent, Structured Advisory</p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-sky shrink-0" />
                <p className="text-xs font-medium text-graphite">Pan-India Entrepreneur Assistance</p>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE ADVISORY VISUAL */}
          <div data-hero="visual" className="lg:col-span-5 relative mt-4 lg:mt-0">
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
