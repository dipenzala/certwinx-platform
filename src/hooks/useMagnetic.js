import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

/**
 * Magnetic hover — element follows the cursor subtly.
 * Usage: const ref = useMagnetic(0.35);
 */
export function useMagnetic(strength = 0.35, options = {}) {
  const ref = useRef(null);
  const { scaleOnHover = 1.03, duration = 0.6 } = options;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia('(pointer: coarse)').matches) return;

      const setX = gsap.quickTo(el, 'x', { duration, ease: 'elastic.out(1, 0.4)' });
      const setY = gsap.quickTo(el, 'y', { duration, ease: 'elastic.out(1, 0.4)' });
      const setScale = gsap.quickTo(el, 'scale', { duration: 0.4, ease: 'power2.out' });

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        setX(x * strength);
        setY(y * strength);
      };

      const onEnter = () => setScale(scaleOnHover);
      const onLeave = () => {
        setX(0);
        setY(0);
        setScale(1);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);

      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: ref }
  );

  return ref;
}