import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

export default function ParallaxLayer({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tween = gsap.fromTo(
      el,
      { yPercent: -speed * 100 },
      {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );

    return () => tween.kill();
  }, [speed]);

  return <div ref={ref} className={className}>{children}</div>;
}