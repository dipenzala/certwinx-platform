import { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';

export default function CounterNumber({
  from = 0,
  to = 100,
  duration = 2,
  prefix = '',
  suffix = '',
  separator = false,
  className = '',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (val) => {
      const num = Math.round(val);
      const formatted = separator ? num.toLocaleString('en-IN') : String(num);
      return `${prefix}${formatted}${suffix}`;
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = format(to);
      return;
    }

    const obj = { val: from };
    el.textContent = format(from);

    const tween = gsap.to(obj, {
      val: to,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = format(obj.val);
      },
    });

    return () => {
      if (tween) tween.kill();
    };
  }, [from, to, duration, prefix, suffix, separator]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {`${prefix}${from}${suffix}`}
    </span>
  );
}