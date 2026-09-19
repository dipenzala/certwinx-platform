import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

/**
 * Parallax on scroll.
 * Usage: const ref = useParallax(0.15); // 15% movement
 */
export function useParallax(speed = 0.15, options = {}) {
  const ref = useRef(null);
  const { start = 'top bottom', end = 'bottom top' } = options;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return ref;
}