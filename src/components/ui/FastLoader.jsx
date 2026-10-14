// ============================================================
// FastLoader - Optimized loading screen
// Fast, smooth, no lag
// ============================================================

import { useEffect, useState } from 'react';

export default function FastLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Realistic progress: quick to 90%, then wait for actual load
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear speed: fast at start, slows down
      const increment = current < 60 ? 8 : current < 85 ? 3 : 1;
      current = Math.min(current + increment, 95);
      setProgress(current);
    }, 80);

    // Complete when window is fully loaded
    const finish = () => {
      setProgress(100);
      setTimeout(() => onComplete?.(), 200);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }

    // Hard fallback - max 2 seconds
    const fallback = setTimeout(finish, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
      window.removeEventListener('load', finish);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="CertWinX"
          className="h-16 sm:h-20 w-auto animate-pulse"
        />

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <span className="text-sm font-mono text-gray-500 tabular-nums">
          {String(progress).padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
}
