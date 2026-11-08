import { Link } from 'react-router-dom';

/**
 * CertWinX Logo Component
 * Props:
 *  - size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
 *  - link: boolean (wrap in Link to '/')
 *  - height: number | string (optional override)
 *  - className: string (extra classes)
 */
export default function Logo({ size = 'md', link = true, height: customHeight, className = '' }) {
  const SIZES = {
    sm: 32,
    md: 44,
    lg: 56,
    xl: 68,
    '2xl': 80,
    '3xl': 96,
  };

  const calculatedHeight = typeof customHeight === 'number'
    ? customHeight
    : SIZES[size] || SIZES.md;

  const img = (
    <img
      src="/certwinx-logo.png"
      alt="CertWinX Logo"
      style={{ height: typeof customHeight === 'string' ? undefined : `${calculatedHeight}px`, width: 'auto' }}
      className={`object-contain max-h-12 w-auto ${className}`}
      draggable={false}
      loading="eager"
    />
  );

  if (!link) return img;

  return (
    <Link
      to="/"
      className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02] focus:outline-none"
      aria-label="CertWinX Home"
    >
      {img}
    </Link>
  );
}
