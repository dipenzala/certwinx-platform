import { useRef } from 'react';
import { gsap, SplitText, useGSAP, ScrollTrigger } from '../lib/gsap';

/**
 * Line-by-line text reveal.
 * Usage: const ref = useTextReveal({ delay: 0.2 });
 *        <h1 ref={ref}>Text here</h1>
 */
export function useTextReveal({
  delay = 0,
  duration = 1.2,
  stagger = 0.08,
  y = 110,
  trigger = null,       // If null, plays immediately on mount
  start = 'top 85%',
  once = true,
} = {}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const run = () => {
        const split = new SplitText(el, {
          type: 'lines',
          linesClass: 'split-line',
        });

        gsap.set(split.lines, { yPercent: y });

        const config = {
          yPercent: 0,
          duration,
          ease: 'expo.out',
          stagger,
          delay,
        };

        if (trigger) {
          config.scrollTrigger = {
            trigger: trigger === true ? el : trigger,
            start,
            once,
          };
        }

        gsap.to(split.lines, config);

        return () => split.revert();
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }
    },
    { scope: ref }
  );

  return ref;
}