import { useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useEffect } from 'react';

export default function TiltCard({ children, className = '', max = 5, scale = 1.015 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.set(el, { transformPerspective: 1000, transformOrigin: '50% 50%' });

    const setRotX = gsap.quickTo(el, 'rotateX', { duration: 0.6, ease: 'power3.out' });
    const setRotY = gsap.quickTo(el, 'rotateY', { duration: 0.6, ease: 'power3.out' });
    const setScale = gsap.quickTo(el, 'scale', { duration: 0.4, ease: 'power2.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      setRotY((px - 0.5) * max * 2);
      setRotX((0.5 - py) * max * 2);
    };
    const onEnter = () => setScale(scale);
    const onLeave = () => { setRotX(0); setRotY(0); setScale(1); };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [max, scale]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}   