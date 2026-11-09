import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

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

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo([dot, ring], 'x', { duration: 0.16, ease: 'power3.out' });
    const yTo = gsap.quickTo([dot, ring], 'y', { duration: 0.16, ease: 'power3.out' });

    let firstMove = true;
    const onMove = (e) => {
      if (firstMove) {
        firstMove = false;
        setHasMoved(true);
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeaveDoc = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onMouseEnterDoc = () => {
      if (!firstMove) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }
    };

    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 1.6,
        duration: 0.22,
        ease: 'power2.out',
      });
      gsap.to(dot, { scale: 0.85, duration: 0.22, ease: 'power2.out' });
    };

    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, duration: 0.22, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.22, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveDoc);
    document.addEventListener('mouseenter', onMouseEnterDoc);

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
      document.removeEventListener('mouseleave', onMouseLeaveDoc);
      document.removeEventListener('mouseenter', onMouseEnterDoc);
      observer.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer Ring — High contrast dual-halo so it is always 100% visible on light AND dark */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full ${
          hasMoved ? 'visible' : 'invisible'
        }`}
        style={{
          border: '2px solid #1C83F3',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.75), 0 0 14px rgba(28, 131, 243, 0.45)',
        }}
      />

      {/* Center Dot — High contrast dual-halo so it never disappears on any section */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full ${
          hasMoved ? 'visible' : 'invisible'
        }`}
        style={{
          backgroundColor: '#1C83F3',
          boxShadow: '0 0 0 1px #FFFFFF, 0 0 6px rgba(28, 131, 243, 0.8)',
        }}
      />
    </>
  );
}
