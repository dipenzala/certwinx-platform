import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, TrendingUp, ShieldCheck, ArrowRight, X } from 'lucide-react';

const BANNERS = [
  { id: 1, icon: Rocket, label: 'STARTUP INDIA', title: 'DPIIT + Tax Exemption', path: '/startup', tone: 'blue' },
  { id: 2, icon: ShieldCheck, label: 'SECTION 80-IAC', title: '3-Year Tax Holiday', path: '/eligibility/80-iac', tone: 'gold' },
  { id: 3, icon: TrendingUp, label: 'SEED FUND', title: 'Up to ₹50L Funding', path: '/funding', tone: 'blue' },
];

export default function LiveBanner({ hidden = false }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const timerRef = useRef(null);
  const lastScrollRef = useRef(0);

  /* SCROLL DETECTION — hide on scroll down, show on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollRef.current + 5;
      const goingUp = currentY < lastScrollRef.current - 5;

      if (currentY < 100) {
        setScrolledDown(false);
      } else if (goingDown) {
        setScrolledDown(true);
      } else if (goingUp) {
        setScrolledDown(false);
      }

      lastScrollRef.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ROTATE BANNERS */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('certwinx_banner_dismissed') === '1') {
      setDismissed(true);
      return;
    }
    const cycle = () => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % BANNERS.length);
        setVisible(true);
      }, 400);
    };
    timerRef.current = setInterval(cycle, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleDismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    sessionStorage.setItem('certwinx_banner_dismissed', '1');
  };

  if (dismissed || hidden) return null;

  const banner = BANNERS[index];
  const tones = {
    blue: {
      dot: 'bg-blue',
      glow: 'shadow-[0_0_16px_rgba(45,156,255,0.6)]',
      label: 'bg-blue/10 text-blue border-blue/20',
      arrow: 'bg-blue/10 text-blue group-hover:bg-blue group-hover:text-white',
    },
    gold: {
      dot: 'bg-gold',
      glow: 'shadow-[0_0_16px_rgba(204,171,110,0.6)]',
      label: 'bg-gold/15 text-gold-deep border-gold/25',
      arrow: 'bg-gold/15 text-gold-deep group-hover:bg-gold group-hover:text-ink',
    },
  };
  const t = tones[banner.tone];

  return (
    <div
      className={`fixed bottom-20 lg:bottom-6 left-3 lg:left-6 z-[60] max-w-[calc(100vw-24px)] sm:max-w-[300px] lg:max-w-[340px] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        visible && !scrolledDown
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <Link
        to={banner.path}
        className="group relative flex items-center gap-2.5 bg-white rounded-full border border-line shadow-[0_16px_40px_-16px_rgba(23,105,255,0.35)] pl-3 pr-2 py-2 hover:shadow-[0_20px_50px_-16px_rgba(23,105,255,0.5)] hover:border-blue/30 transition-all duration-500"
      >
        {/* Live dot */}
        <span className="relative shrink-0 flex items-center justify-center">
          <span className={`absolute w-2.5 h-2.5 rounded-full ${t.dot} opacity-40 animate-ping`} />
          <span className={`relative w-1.5 h-1.5 rounded-full ${t.dot} ${t.glow}`} />
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[8px] font-bold tracking-[0.15em] uppercase ${t.label}`}>
              <banner.icon size={8} strokeWidth={2.5} />
              {banner.label}
            </span>
          </div>
          <p className="text-[11px] font-semibold text-ink leading-tight truncate">
            {banner.title}
          </p>
        </div>

        {/* Arrow */}
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${t.arrow}`}
        >
          <ArrowRight size={13} strokeWidth={2.4} />
        </span>

        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-line flex items-center justify-center text-graphite hover:text-ink shadow-sm"
        >
          <X size={10} strokeWidth={2.5} />
        </button>
      </Link>
    </div>
  );
}