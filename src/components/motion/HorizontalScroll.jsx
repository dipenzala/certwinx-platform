import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

/**
 * Horizontal scroll section.
 * Wrap content in a flex row. On scroll, this translates horizontally
 * while the parent is pinned.
 */
export default function HorizontalScroll({ children, className = '', speed = 1 }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScroll * speed}`,
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [speed]);

  return (
    <section ref={wrapperRef} className={`relative overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex gap-8 will-change-transform">
        {children}
      </div>
    </section>
  );
}