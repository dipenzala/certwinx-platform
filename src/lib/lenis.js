import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenisInstance = null;
let rafCallback = null;

export function initLenis() {
  // Guard: don't double-init
  if (lenisInstance) return lenisInstance;
  if (typeof window === 'undefined') return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  // Ensure body/html are NOT blocked by leftover styles
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.5,
    wheelMultiplier: 1,
    infinite: false,
    autoRaf: false,       // We drive raf via gsap.ticker
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  rafCallback = (time) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
    }
  };
  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function destroyLenis() {
  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
    rafCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  // Make sure scroll is never blocked
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}