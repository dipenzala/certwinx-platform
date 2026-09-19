import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo([dot, ring], 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo([dot, ring], 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 2.2, duration: 0.35, ease: 'power3.out', borderColor: 'rgba(22,131,255,0.4)' });
      gsap.to(dot, { scale: 0.4, duration: 0.35, ease: 'power3.out' });
    };

    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3.out', borderColor: 'rgba(15,15,16,0.35)' });
      gsap.to(dot, { scale: 1, duration: 0.35, ease: 'power3.out' });
    };

    window.addEventListener('mousemove', onMove);

    const bindInteractive = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    };

    bindInteractive();
    const observer = new MutationObserver(bindInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-ink/35"
        style={{ mixBlendMode: 'difference' }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-ink"
      />
    </>
  );
}