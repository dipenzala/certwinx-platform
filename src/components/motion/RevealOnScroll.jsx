import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

export default function RevealOnScroll({
  children,
  className = '',
  y = 40,
  duration = 1,
  delay = 0,
  start = 'top 88%',
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tween = gsap.fromTo(
      el,
      { y, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration,
        delay,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start, once },
      }
    );

    return () => tween.kill();
  }, [y, duration, delay, start, once]);

  return <div ref={ref} className={className}>{children}</div>;
}