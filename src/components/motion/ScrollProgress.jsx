import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.to(bar, { scaleX: self.progress, duration: 0.15, ease: 'none', overwrite: true });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9997] h-[2px] bg-transparent pointer-events-none">
      <div ref={barRef} className="h-full bg-gradient-to-r from-blue via-blue-deep to-gold" />
    </div>
  );
}