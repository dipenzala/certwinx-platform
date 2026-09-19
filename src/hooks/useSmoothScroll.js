import { useEffect } from 'react';
import { initLenis, destroyLenis } from '../lib/lenis';
import { ScrollTrigger } from '../lib/gsap';

export function useSmoothScroll() {
  useEffect(() => {
    initLenis();

    // Refresh ScrollTrigger after mount
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(refreshTimer);
      destroyLenis();
    };
  }, []);
}