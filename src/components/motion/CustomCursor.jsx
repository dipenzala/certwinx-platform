import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [cursorColor, setCursorColor] = useState('#FFFFFF');

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

    /* ============ BACKGROUND DETECT ============ */
    const detectBackground = (x, y) => {
      const el = document.elementFromPoint(x, y);
      if (!el) return;

      let bgColor = getComputedStyle(el).backgroundColor;
      let parent = el.parentElement;

      // Agar transparent hai, to parent ka dekho
      while (
        parent &&
        (bgColor === 'rgba(0, 0, 0, 0)' ||
          bgColor === 'transparent' ||
          bgColor === '')
      ) {
        bgColor = getComputedStyle(parent).backgroundColor;
        parent = parent.parentElement;
      }

      // RGB values nikalo
      const rgb = bgColor.match(/\d+/g);
      if (!rgb) return;

      const [r, g, b] = rgb.map(Number);

      // Luminance formula (0 = dark, 1 = light)
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      // Dark background → White cursor
      // Light background → Blue cursor
      const newColor = luminance < 0.5 ? '#FFFFFF' : '#1683FF';

      setCursorColor((prev) => (prev !== newColor ? newColor : prev));
    };

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      detectBackground(e.clientX, e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 2.2,
        duration: 0.35,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: 0.4, duration: 0.35, ease: 'power3.out' });
    };

    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3.out' });
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
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full transition-colors duration-300"
        style={{
          border: `1.5px solid ${cursorColor}`,
          boxShadow: `0 0 12px ${cursorColor}55`,
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full transition-colors duration-300"
        style={{
          backgroundColor: cursorColor,
          boxShadow: `0 0 8px ${cursorColor}88`,
        }}
      />
    </>
  );
}