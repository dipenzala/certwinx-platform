import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

export default function SplitTextReveal({
  children,
  as: Tag = 'div',
  className = '',
  trigger = 'scroll',
  delay = 0,
  duration = 1.1,
  start = 'top 85%',
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.set(el, { opacity: 1 });

    const config = {
      y: 24,
      opacity: 0,
      duration,
      delay,
      ease: 'expo.out',
    };

    if (trigger === 'scroll') {
      config.scrollTrigger = {
        trigger: el,
        start,
        once,
      };
    }

    const tween = gsap.from(el, config);

    return () => {
      if (tween) tween.kill();
    };
  }, [trigger, delay, duration, start, once]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}