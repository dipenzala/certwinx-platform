import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';

export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  strength = 0.25,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const setX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power2.out' });
    const setY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power2.out' });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      setX(x * strength);
      setY(y * strength);
    };
    const onLeave = () => { setX(0); setY(0); };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  const variants = {
    primary: 'bg-blue text-white hover:bg-deepblue shadow-[0_10px_25px_-8px_rgba(28,131,243,0.5)]',
    outline: 'bg-white border border-line text-ink hover:border-blue hover:text-blue shadow-sm',
    blue: 'bg-blue text-white hover:bg-deepblue shadow-[0_10px_25px_-8px_rgba(28,131,243,0.5)]',
    gold: 'bg-blue text-white hover:bg-deepblue shadow-[0_10px_25px_-8px_rgba(28,131,243,0.5)]', // fallback to blue
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#1FB855] shadow-[0_10px_25px_-8px_rgba(37,211,102,0.4)]',
    ghost: 'text-ink hover:bg-blue/5 hover:text-blue',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wide',
    md: 'px-6 py-3 text-sm font-semibold tracking-wide',
    lg: 'px-8 py-3.5 text-sm font-bold tracking-wide',
  };

  const base = `group relative inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 will-change-transform ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (to) return <Link ref={ref} to={to} className={base} {...rest}>{inner}</Link>;
  if (href) return <a ref={ref} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={base} {...rest}>{inner}</a>;
  return <button ref={ref} onClick={onClick} className={base} {...rest}>{inner}</button>;
}
