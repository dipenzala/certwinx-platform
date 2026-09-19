import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

/**
 * Live animated background:
 * - 3 large gradient blobs that slowly drift and morph
 * - Faded marquee text strip running diagonally
 * - Subtle noise + grid
 * Respects reduced-motion.
 */
export default function LiveBackground() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Blob drift
      const blobs = gsap.utils.toArray('[data-blob]');
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: () => gsap.utils.random(-120, 120),
          y: () => gsap.utils.random(-100, 100),
          scale: () => gsap.utils.random(0.9, 1.15),
          duration: 12 + i * 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      // Marquee text rotation & translate
      gsap.to('[data-marquee]', {
        x: '-50%',
        duration: 60,
        ease: 'none',
        repeat: -1,
      });
      gsap.to('[data-marquee-2]', {
        x: '-50%',
        duration: 80,
        ease: 'none',
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const marqueeItems = [
    'DPIIT', 'Startup India', 'Udyam', 'Section 80-IAC', 'GeM',
    'ISO 9001', 'MSME', 'FSSAI', 'IEC', 'ZED', 'NSIC', 'CGSS',
  ];

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base warm white */}
      <div className="absolute inset-0 bg-canvas" />

      {/* Blobs */}
      <div
        data-blob
        className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full opacity-[0.18]"
        style={{
          background: 'radial-gradient(circle, #1683FF 0%, transparent 60%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <div
        data-blob
        className="absolute top-1/4 -right-40 w-[640px] h-[640px] rounded-full opacity-[0.14]"
        style={{
          background: 'radial-gradient(circle, #CCAB6E 0%, transparent 60%)',
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
      />
      <div
        data-blob
        className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #2D9CFF 0%, transparent 60%)',
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
      />

      {/* Diagonal faded marquee text */}
      <div
        className="absolute top-[18%] left-0 right-0 overflow-hidden"
        style={{ transform: 'rotate(-4deg)' }}
      >
        <div
          data-marquee
          className="flex whitespace-nowrap will-change-transform"
          style={{ width: 'max-content' }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 font-display text-[7rem] lg:text-[11rem] font-semibold tracking-tight text-ink/[0.035]"
            >
              {item} <span className="text-blue/10">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Second line, opposite direction, lower */}
      <div
        className="absolute bottom-[10%] left-0 right-0 overflow-hidden"
        style={{ transform: 'rotate(-4deg)' }}
      >
        <div
          data-marquee-2
          className="flex whitespace-nowrap will-change-transform"
          style={{ width: 'max-content' }}
        >
          {[...marqueeItems.slice().reverse(), ...marqueeItems.slice().reverse()].map((item, i) => (
            <span
              key={i}
              className="mx-8 font-display text-[7rem] lg:text-[11rem] font-semibold tracking-tight text-ink/[0.025]"
            >
              {item} <span className="text-gold/10">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="bg-grid" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#0F0F10" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-grid)" />
        </svg>
      </div>

      {/* Radial fade — keeps edges clean */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, rgba(250,250,248,0.85) 90%)',
        }}
      />
    </div>
  );
}