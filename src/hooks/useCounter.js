import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap';

/**
 * Animated number counter on scroll.
 * Usage: const ref = useCounter({ to: 500, suffix: '+' });
 */
export function useCounter({ from = 0, to = 100, duration = 2, suffix = '', prefix = '' } = {}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const obj = { val: from };
      el.textContent = `${prefix}${from}${suffix}`;

      gsap.to(obj, {
        val: to,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return ref;
}