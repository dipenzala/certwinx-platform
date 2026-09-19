import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

/**
 * 3D tilt on mouse move.
 * Usage: const ref = useTilt({ max: 6 });
 */
export function useTilt({ max = 6, duration = 0.6, scale = 1.02 } = {}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia('(pointer: coarse)').matches) return;

      const setRotX = gsap.quickTo(el, 'rotateX', { duration, ease: 'power3.out' });
      const setRotY = gsap.quickTo(el, 'rotateY', { duration, ease: 'power3.out' });
      const setScale = gsap.quickTo(el, 'scale', { duration: 0.4, ease: 'power2.out' });

      gsap.set(el, { transformPerspective: 1000, transformOrigin: '50% 50%' });

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotY = (px - 0.5) * max * 2;
        const rotX = (0.5 - py) * max * 2;
        setRotX(rotX);
        setRotY(rotY);
      };

      const onEnter = () => setScale(scale);
      const onLeave = () => {
        setRotX(0);
        setRotY(0);
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