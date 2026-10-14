// ============================================================
// FastPreloader - Optimized loading screen
// No artificial delays, completes as soon as possible
// ============================================================

import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    let finished = false;

    // Fast increment - realistic progress
    const interval = setInterval(() => {
      if (finished) return;
      // Fast at start, slows at end
      const increment = current < 50 ? 15 : current < 80 ? 6 : 2;
      current = Math.min(current + increment, 95);
      setProgress(current);
    }, 50);

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setTimeout(() => {
        setHidden(true);
        setTimeout(() => onComplete?.(), 200);
      }, 150);
    };

    // Complete as soon as page loads
    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    // Hard max: 1.5 seconds (fast!)
    const fallback = setTimeout(finish, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
      window.removeEventListener('load', finish);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white transition-opacity duration-200 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <img
          src="/certwinx-logo.png"
          alt="CertWinX"
          className="h-16 sm:h-20 w-auto"
          loading="eager"
          fetchPriority="high"
        />
        <div className="w-56 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-mono text-gray-400 tabular-nums">
          {String(progress).padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
}
