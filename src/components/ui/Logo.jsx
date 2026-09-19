import { Link } from 'react-router-dom';

/**
 * CertWinX Logo — uses PNG image.
 * Props:
 *  - size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
 *  - link: boolean (wrap in Link to '/')
 *  - className: string (extra classes)
 */
export default function Logo({ size = 'md', link = true, className = '' }) {
  const sizes = {
    sm: { height: 32 },
    md: { height: 44 },
    lg: { height: 56 },
    xl: { height: 68 },
    '2xl': { height: 80 },
    '3xl': { height: 96 },
  };

  const { height } = sizes[size] || sizes.md;

  const img = (
    <img
      src="/certwinx-logo.png"
      alt="CertWinX Private Limited"
      style={{ height: `${height}px`, width: 'auto' }}
      className={`object-contain ${className}`}
      draggable={false}
    />
  );

  if (!link) return img;

  return (
    <Link
      to="/"
      className="group inline-flex items-center transition-transform duration-300 hover:scale-[1.02]"
      aria-label="CertWinX Home"
    >
      {img}
    </Link>
  );
}