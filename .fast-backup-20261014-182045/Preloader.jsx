import { useEffect, useState } from 'react';
import { gsap } from '../../lib/gsap';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(100);
      setTimeout(() => {
        setHidden(true);
        onComplete?.();
      }, 150);
      return;
    }

    /* ============ FAST LOADING — 0.6s ============ */
    const duration = 600; // 0.6s (pehle 1800 tha)
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setHidden(true);
          onComplete?.();
        }, 150);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-canvas flex items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky/15 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-blue/10 blur-[80px]" />
      </div>

      <div className="relative flex flex-col items-center">

        {/* ============ LOGO — BADA ============ */}
        <div className="mb-8">
          <img
            src="/certwinx-logo.png"
            alt="CertWinX"
            style={{ height: '96px', width: 'auto' }}
            className="object-contain"
            draggable={false}
          />
        </div>

        {/* ============ TAGLINE — NAYA ============ */}
        <p className="text-[13px] font-bold tracking-[0.35em] text-muted uppercase mb-3">
          Loading Experience
        </p>

        {/* Nayi tagline — brand line */}
        <p
          className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 whitespace-nowrap"
          style={{
            background:
              'linear-gradient(90deg, #CCAB6E 0%, #F6E9C9 25%, #CCAB6E 50%, #F6E9C9 75%, #CCAB6E 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Aapki Tarakki Ka Saathi
        </p>

        {/* Progress bar */}
        <div className="w-[280px] h-[3px] bg-line rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue to-gold rounded-full transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p className="text-sm font-bold text-ink tabular-nums">
          {String(Math.round(progress)).padStart(3, '0')}%
        </p>
      </div>
    </div>
  );
}